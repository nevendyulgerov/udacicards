import React, { Component } from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import { darkBlue, pink, blue, white } from "../../common/colors";

const ResultView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${darkBlue};
`;

const ButtonBox = styled.View`
  flex: 3;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const ButtonFont = styled.Text`
  font-size: 18px;
  color: ${white};
`;

const RestartTrigger = styled.TouchableOpacity`
  background-color: ${pink};
  width: 50%;
  height: 15%;
  margin: 0;
  align-items: center;
  justify-content: center;
`;

const BackTrigger = styled.TouchableOpacity`
  background-color: ${blue};
  width: 50%;
  height: 15%;
  margin: 0;
  align-items: center;
  justify-content: center;
`;

const ResultsBox = styled.View`
  flex: 1;
  width: 100%;
  margin: 10px;
  padding: 20px 10px;
  background-color: ${blue};
  align-items: stretch;
  justify-content: center;
`;

const ResultsText = styled.Text`
  flex: 1;
  width: 100%;
  font-size: 18px;
  color: ${white};
  align-items: stretch;
  justify-content: center;
`;

const ResultsCounter = styled.Text`
  margin-left: 10px;
  font-weight: 800;
`;

export default class Result extends Component {

  /**
   * @description Redirect
   * @returns {*|Response|void}
   */
  redirect = () => this.props.redirect();

  /**
   * @description Reset quiz
   * @returns {*}
   */
  resetQuiz = () => this.props.resetQuiz();

  /**
   * @description Render
   * @returns {*}
   */
  render() {
    const correctAnswers = this.props.correctAnswers;
    const incorrectAnswers = this.props.total - correctAnswers;

    return (
      <ResultView>

        <ResultsBox>
          <ResultsText>
            <Text style={{paddingRight: 10}}>Right answers:</Text>
            <ResultsCounter style={{marginLeft: 10}}>{correctAnswers}</ResultsCounter>
          </ResultsText>

          <ResultsText>
            <Text style={{paddingRight: 10}}>Wrong answers:</Text>
            <ResultsCounter style={{marginLeft: 10}}>{incorrectAnswers}</ResultsCounter>
          </ResultsText>

          <ResultsText>
            <Text style={{paddingRight: 10}}>Total answers:</Text>
            <ResultsCounter style={{marginLeft: 10}}>{this.props.total}</ResultsCounter>
          </ResultsText>
        </ResultsBox>

        <ButtonBox>
          <RestartTrigger onPress={this.resetQuiz}>
            <ButtonFont>Restart Quiz</ButtonFont>
          </RestartTrigger>

          <BackTrigger onPress={this.redirect}>
            <ButtonFont>Back To Deck</ButtonFont>
          </BackTrigger>
        </ButtonBox>

      </ResultView>
    );
  }
}
