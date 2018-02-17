import React from "react";
import AddDeck from "./deck/AddDeck";
import DeckListView from "./deck/DecksList";
import Quiz from "./quiz/Quiz";
import AddQuizCard from "./quiz/AddQuizCard";
import DeckView from "./deck/NewDeck";
import { TabNavigator, StackNavigator } from "react-navigation";
import {
  darkBlue,
  lightBlue,
  blue,
  white
} from "../common/colors";

const navigationOptions = {
  headerTintColor: white,
  headerStyle: { backgroundColor: lightBlue }
};

const navItems = {
  Decks: {
    screen: DeckListView,
    navigationOptions: { tabBarLabel: 'Decks' }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: { tabBarLabel: 'New Deck' }
  }
};

const navOptions = {
  tabBarOptions: {
    style: { backgroundColor: lightBlue },
    activeTintColor: darkBlue,
    inactiveTintColor: blue
  },
  tabBarPosition: 'bottom'
};

const Tabs = TabNavigator(navItems, navOptions);

const Navigation = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView,
    navigationOptions
  },
  AddQuiz: {
    screen: AddQuizCard,
    navigationOptions
  },
  Quiz: {
    screen: Quiz,
    navigationOptions
  }
});

export default Navigation;
