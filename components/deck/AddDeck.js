import React from "react";
import { connect } from "react-redux";
import { Text, View, TextInput, Button } from "react-native";
import styled from "styled-components/native";
import { NavigationActions } from "react-navigation";
import { saveNewDeck } from '../../common/api';
import { addNewDeck } from "../../store/actions/index";
import {darkBlue, blue, pink, white } from "../../common/colors";

const DeckContainer = styled.View`
	flex: 1;
	align-items space-between;
	background-color: ${darkBlue};
	padding: ${20}px ${10}px;
	width: 100%;
`;

const TextLayout = styled.View`
  flex: 1;
  padding: ${20}px ${10}px;
  width: 100%;
  background-color: ${blue};
`;

const DeckHeader = styled.Text`
	font-size: 32px;
	font-weight: ${600};
	color: ${pink};
`;

const DeckInput = styled.TextInput`
	margin-top: 0;
	font-size: 18px;
	color: ${white};
`;

const ButtonView = styled.View`
  flex: 1;
  width: 100%;
  padding: ${10}px ${0}px;
`;

class AddDeck extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    newDeckTitle: ''
  };

  /**
   * @description Handle submit
   */
  handleSubmit = () => {
    saveNewDeck(this.state.newDeckTitle, deck => {
      this.props.addNewDeck(deck);
      this.redirect(deck);
    });
  };

  /**
   * @description Redirect
   */
  redirect = deck => {
    const actions = [ NavigationActions.navigate({ routeName: 'DeckView', params: {deckID: deck.title}}) ];
    const resetAction = NavigationActions.reset({ index: 0, actions });
    this.props.navigation.dispatch(resetAction);
  };

  /**
   * @description Render
   * @returns {*}
   */
  render() {
    return (
    	<DeckContainer>
	      <TextLayout>
	      	<DeckHeader>Enter a deck title</DeckHeader>
	        <DeckInput
	          height={60}
            value={this.state.newDeckTitle}
            placeholder={'Deck title...'}
	          onChangeText={newDeckTitle => this.setState({ newDeckTitle })}
            autoCorrect={false}
	        />
	      </TextLayout>
	      <ButtonView>
	        <Button
	          title="Add"
	          onPress={this.handleSubmit}
	        />
	      </ButtonView>
      </DeckContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNewDeck: newDeck => dispatch(addNewDeck(newDeck))
});

export default connect(null, mapDispatchToProps)(AddDeck);
