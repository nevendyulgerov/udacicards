import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { NavigationActions } from "react-navigation";
import QuizResult from "./QuizResult";
import { darkBlue, pink, blue, purple } from "../../common/colors";

const DeckFont = styled.Text`
  font-size: 35px;
  font-weight: 600;
  color: ${pink};
`;

const CountFont = styled.Text`
  font-size: 18px;
  color: ${pink};
`;

const QuizView = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${darkBlue};
`;

const CountView = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 1%;
  padding: 10px 10px 0 10px;
  align-content: flex-start;
`;

const TextView = styled.View`
  flex: 3;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 5%;
`;

const ButtonContainer = styled.View`
  flex: 3;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
`;

const ButtonFont = styled.Text`
  font-size: 18px;
  color: #ffffff;
`;

const CorrectTrigger = styled.TouchableOpacity`
  background-color: ${pink};
  width: 50%;
  height: 20%;
  margin: 10px 10px 0 10px;
  align-items: center;
  justify-content: center;
`;

const InCorrectTrigger = styled.TouchableOpacity`
  background-color: ${blue};
  width: 50%;
  height: 20%;
  margin: 10px 10px 0 10px;
  align-items: center;
  justify-content: center;
`;

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Decks / ${navigation.state.params.title}`
  });

  correctAnswers = 0;

  state = {
    questions: this.props.decks[this.props.navigation.state.params.title].questions,
    currentStep: 0,
    showAnswer: false,
    resetQuiz: true
  };

  /**
   * @description Go to next question
   */
  goToNextQuestion = () => {
    if (this.state.questions.length - 1 === this.state.currentStep) {
      this.displayFinalResult();
    } else {
      this.setState(prevState => ({
        currentStep: prevState.currentStep + 1,
        showAnswer: false
      }));
    }
  };

  /**
   * @description Display final result
   */
  displayFinalResult = () => {
    this.setState({
      resetQuiz: false,
      currentStep: 0
    });
  };

  /**
   * @description Handle correct answer
   */
  handleCorrectAnswer = () => {
    this.correctAnswers = this.correctAnswers + 1;
    this.goToNextQuestion();
  };

  /**
   * @description Handle incorrect answer
   */
  handleIncorrectAnswer = () => this.goToNextQuestion();

  /**
   * @description Reset quiz
   */
  resetQuiz = () => {
    this.setState({ resetQuiz: true });
    this.correctAnswers = 0;
  };

  /**
   * @description Go to deck
   */
  goToDeck = () => {
    const title = this.props.navigation.state.params.title;
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'DeckView', params: {deckID: title}})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  /**
   * @description Render
   * @returns {*}
   */
  render() {
    const questions = this.state.questions;
    const currentStep = this.state.currentStep;

    if (!this.state.resetQuiz) {
      return (
        <QuizResult
          title={this.props.navigation.state.params.title}
          total={this.state.questions.length}
          correctAnswers={this.correctAnswers}
          resetQuiz={this.resetQuiz}
          redirect={this.goToDeck}
        />
      );
    }
    return (
      <QuizView>
        <CountView>
          <CountFont>
            {this.state.currentStep + 1}/{this.state.questions.length}
          </CountFont>
        </CountView>

        <TextView>
          <DeckFont style={{fontSize: 28}}>
            {questions[currentStep].question}
          </DeckFont>
          {this.state.showAnswer ? (
            <DeckFont style={{fontSize: 20, textAlign: 'center'}}>
              {questions[currentStep].answer}
            </DeckFont>
          ) : (
            <TouchableOpacity onPress={() => this.setState({ showAnswer: true })}>
              <Text style={{color: purple}}>Show answer</Text>
            </TouchableOpacity>
          )}
        </TextView>

        <ButtonContainer>
          <CorrectTrigger onPress={this.handleCorrectAnswer}>
            <ButtonFont>True</ButtonFont>
          </CorrectTrigger>

          <InCorrectTrigger onPress={this.handleIncorrectAnswer}>
            <ButtonFont>False</ButtonFont>
          </InCorrectTrigger>
        </ButtonContainer>
      </QuizView>
    );
  }
}

const mapStateToProps = state => ({
  decks: state
});

export default connect(mapStateToProps)(Quiz);
