import {
  ADD_NEW_CARD,
  ADD_NEW_DECK,
  RETRIEVE_DECKS
} from '../action-types';

/**
 * @description Add new card
 * @param newCard
 * @param title
 * @returns {{type, newCard: *, title: *}}
 */
export const addNewCard = (newCard, title) => ({
  type: ADD_NEW_CARD,
  newCard,
  title
});

/**
 * @description Add new deck
 * @param newDeck
 * @returns {{type, newDeck: *}}
 */
export const addNewDeck = newDeck => ({
  type: ADD_NEW_DECK,
  newDeck
});

/**
 * @description Retrieve decks
 * @param decks
 * @returns {{type, decks: *}}
 */
export const retrieveDecks = decks => ({
  type: RETRIEVE_DECKS,
  decks
});
