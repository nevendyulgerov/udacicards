import React from "react";
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity ,
  Text,
  FlatList,
  AsyncStorage
} from "react-native";
import { darkBlue, lightBlue } from "../../common/colors";

import styled from "styled-components/native";
import { retrieveDecks } from '../../store/actions/';

const DeckTitle = styled.Text`
  font-size: 32px;
  font-weight: ${600};
  color: ${darkBlue};
`;

const QuestionCount = styled.Text`
  font-size: 18px;
  font-weight: ${100};
  color: ${darkBlue};
`;

const DeckLayout = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-bottom-width: ${1}px;
  border-color: ${darkBlue};
  border-bottom-color: ${darkBlue};
  width: 100%;
  padding: ${20}px ${10}px;
  background-color: ${lightBlue};
`;

const DecksList = styled.FlatList`
  flex: 1;
  border: 1px solid ${lightBlue};
  width: 100%;
  background-color: ${darkBlue};
`;

class DeckListView extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    decksData: {}
  };

  /**
   * @description Component did mount hook
   * @returns {Promise<void>}
   */
  async componentDidMount() {

    // TODO: Replace api call

    try {
      let response = await AsyncStorage.getItem("decks");
      let decks = (await JSON.parse(response)) || {};
      this.setState({
        decksData: decks
      });
      this.props.retrieveDecks(decks);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description Get key
   * @param item
   * @returns {*}
   */
  getKey = item => item;

  /**
   * @description Render deck item
   * @param item
   * @returns {*}
   */
  renderDeckItem = ({item}) => {
    const { navigate } = this.props.navigation;
    const target = this.props.decksData[item];
    return (
      <DeckLayout onPress={() => navigate('DeckView', {deckID: item})}>
        <DeckTitle>
          {target.title}
        </DeckTitle>
        <QuestionCount>
          {target.questions.length} {target.questions.length > 1 ? 'cards' : 'card'}
        </QuestionCount>
      </DeckLayout>
    );
  };

  render() {
    if (this.props.decksData) {
      return (
        <DecksList
          data={Object.keys(this.props.decksData)}
          keyExtractor={this.getKey}
          renderItem={this.renderDeckItem}
        />
      );
    }
    return <View />;
  }
}

const mapStateToProps = state => ({decksData: state});
const mapDispatchToProps = dispatch => ({
  retrieveDecks: decks => dispatch(retrieveDecks(decks))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView);
