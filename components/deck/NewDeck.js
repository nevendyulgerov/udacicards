import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { View, Text, Button, StyleSheet } from "react-native";
import { darkBlue, pink, purple } from "../../common/colors";
import { clearLocalNotification, setLocalNotification } from "../../common/api";

const DeckLayout = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${darkBlue};
  padding: 10px;
`;

const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ActionContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10%;
`;

const DeckTitle = styled.Text`
  font-size: 50px;
  color: ${pink};
`;

const QuestionsCount = styled.Text`
  font-size: 20px;
  color: ${pink}
`;

const ButtonView = styled.View`
  width: 115%;
  margin: ${10}px ${0}px;
`;

class DeckView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Decks`
  });

  state = {
    deck: null
  };

  /**
   * @description Component did mount hook
   */
  componentDidMount() {
    const { decks, navigation } = this.props;

    this.setState({
      deck: decks[navigation.state.params.deckID]
    });
  }

  /**
   * @description Component will receive props hook
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    this.setState({
      deck: nextProps.decks[navigation.state.params.deckID]
    });
  }

  /**
   * @description Initialize quiz
   */
  initQuiz = () => {
    clearLocalNotification().then(setLocalNotification);
    this.props.navigation.navigate('Quiz', { title: this.state.deck.title });
  };

  /**
   * @description Render
   * @returns {*}
   */
  render() {
    const { navigate } = this.props.navigation;
    const deck = this.state.deck;

    if (!this.state.deck) {
      return <View />;
    }
    return (
      <DeckLayout>

        <TextContainer>
          <DeckTitle>{deck.title}</DeckTitle>
          <QuestionsCount>
            {deck.questions.length} cards
          </QuestionsCount>
        </TextContainer>

        <ActionContainer>
          {deck.questions.length !== 0 && (
            <ButtonView>
              <Button
                title="Start Quiz"
                onPress={this.initQuiz}
              />
            </ButtonView>
          )}

          <ButtonView>
            <Button
              title="Add Card"
              color={purple}
              onPress={() => navigate('AddQuiz', { title: deck.title })}
            />
          </ButtonView>
        </ActionContainer>

      </DeckLayout>
    );
  }
}

const mapStateToProps = state => ({
  decks: state
});

export default connect(mapStateToProps)(DeckView);
