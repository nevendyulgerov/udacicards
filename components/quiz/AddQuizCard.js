import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button } from 'react-native';
import styled from "styled-components/native";
import { addCardToDeck } from '../../common/api';
import { addNewCard } from '../../store/actions/index';
import { darkBlue, white } from "../../common/colors";

const TextLayout = styled.View`
	flex: 1;
	padding: ${20}px ${10}px;
	background-color: ${darkBlue};
`;

const ButtonView = styled.View`
  width: 100%;
  padding: ${40}px ${0}px;
`;

class AddQuiz extends React.Component {

	static navigationOptions = ({ navigation }) => ({
    title: `Decks / ${navigation.state.params.title}`
  });

	state = {
		question: '',
		answer: '',
	};

  /**
   * @description Navigate back
   * @returns {void|*}
   */
	navigateBack = () => this.props.navigation.goBack();

  /**
   * @description Handle submit
   */
	handleSubmit = () => {
    const title = this.props.navigation.state.params.title;
    const newCard = {
      question: this.state.question,
      answer: this.state.answer
    };

    addCardToDeck(title, newCard, () => {
      this.props.updateDeckWithNewCard(newCard, title);
      this.navigateBack();
    });
  };

  /**
   * @description Set question
   * @param question
   */
	setQuestion = question => this.setState({ question });

  /**
   * @description Set answer
   * @param answer
   */
	setAnswer = answer => this.setState({ answer });

  /**
   * @description Render
   * @returns {*}
   */
	render() {
		return (
			<TextLayout>
				<TextInput
					height={60}
          style={{color: white}}
          placeholder={'Card question...'}
					onChangeText={this.setQuestion}
	        value={this.state.question}
				/>
				<TextInput
					height={60}
          style={{color: white}}
          placeholder={'Card answer...'}
					onChangeText={this.setAnswer}
	        value={this.state.answer}
				/>
				<ButtonView>
					<Button
	          title={'Add Card'}
	          onPress={this.handleSubmit}
	        />
				</ButtonView>
			</TextLayout>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	updateDeckWithNewCard: (newCard, title) => dispatch(addNewCard(newCard, title))
});

export default connect(null, mapDispatchToProps)(AddQuiz);
