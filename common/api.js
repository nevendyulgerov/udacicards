import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from 'expo';
import { serialize, deserialize, sequence } from './utils';
import { defaultDecks, defaultNotification } from './data';
import { extend } from "./utils";

const NOTIFICATION_KEY = "UDACI_CARDS_NOTIFICATION";

/***
 * @description Retrieve decks
 * @param callback
 */
export const retrieveDecks = (callback = () => {}) =>
  AsyncStorage.getItem('decks')
    .then(deserialize)
    .then(decks => callback(null, decks));

/**
 * @description Save new deck
 * @param deckTitle
 * @param callback
 */
export const saveNewDeck = (deckTitle: '', callback = () => {}) => {
  sequence()
    // get decks
    .chain(seq => retrieveDecks((err, decks) => {
      if (err) {
        return console.error(err);
      }
      const newDeck = {
        title: deckTitle,
        questions: []
      };
      seq.resolve({ decks, newDeck });
    }))
    // save modified decks
    .chain(seq => {
      const { decks, newDeck } = seq.response.value;
      decks[newDeck.title] = newDeck;
      AsyncStorage.setItem('decks', serialize(decks)).then(() => callback(newDeck));
    })
    .execute();
};

/**
 * @description Add card to deck
 * @param title
 * @param card
 * @param callback
 */
export const addCardToDeck = (title, card, callback = () => {}) => {
  sequence()
    // get decks
    .chain(seq => {
      retrieveDecks((err, decks) => {
        if (err) {
          return console.error(err);
        }
        decks[title].questions = [...decks[title].questions, card];
        seq.resolve(decks);
      })
    })
    // save modified decks
    .chain(seq => AsyncStorage.setItem('decks', serialize(seq.response.value)).then(decks => callback(decks)))
    .execute();
};

/**
 * @description Set default decks
 * @param callback
 */
export const setDefaultDecks = (callback = () => {}) => {
  AsyncStorage.setItem('decks', serialize(extend({}, defaultDecks)))
    .then(callback);
};

/**
 * @description Clear local notification
 * @returns {Promise<*>|Promise<T>}
 */
export const clearLocalNotification = (callback = () => {}) =>
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
    .then(callback);

/**
 * @description Create notification
 */
export const createNotification = () => defaultNotification;

/**
 * @description Set local notification
 */
export const setLocalNotification = () => {
  AsyncStorage
    .getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data !== null) {
        return false;
      }
      Permissions
        .askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted') {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(12);
            tomorrow.setMinutes(0);

            Notifications.cancelAllScheduledNotificationsAsync();
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day',
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, serialize(true))
          }
        });
    });
};
