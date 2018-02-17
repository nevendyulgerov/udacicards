import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AppStatusBar from "./components/StatusBar";
import Navigation from './components/Navigation';
import { Provider } from "react-redux";
import Store from './store';
import { setLocalNotification, setDefaultDecks } from './common/api';
import { blue } from "./common/colors";

export default class App extends React.Component {
  state = {
    areDecksLoaded: false
  };

  componentDidMount() {
    setLocalNotification();
    setDefaultDecks(() => this.setState({ areDecksLoaded: true }));
  }

  render() {
    if (!this.state.areDecksLoaded) {
      return null;
    }
    return (
      <Provider store={Store}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={blue}/>
          <Navigation />
        </View>
      </Provider>
    );
  }
}
