import {
  ADD_NEW_CARD,
  ADD_NEW_DECK,
  RETRIEVE_DECKS
} from '../action-types';
import { extend } from "../../common/utils";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_CARD:
      return extend({}, state, {
        [action.title]: {
          title: action.title,
          questions: [...state[action.title].questions, action.newCard]
        }
      });
    case ADD_NEW_DECK:
      return extend({}, state, { [action.newDeck.title]: action.newDeck });
    case RETRIEVE_DECKS:
      return { ...state, ...action.decks };
    default:
      return state;
  }
}
