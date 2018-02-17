export const defaultDecks = {
  React: {
    title: "React",
    questions: [{
      question: "What is React?",
      answer: "A library for managing user interfaces"
    }, {
      question: "Where do you make Ajax requests in React?",
      answer: "The componentDidMount lifecycle event"
    }, {
      question: "Where do you make Ajax requests in React?",
      answer: "The componentDidMount lifecycle event"
    }]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [{
      question: "What is a closure?",
      answer: "The combination of a function and the lexical environment within which that function was declared."
    }]
  }
};

export const defaultNotification = {
  title: 'Log your stats!',
  body: `👋 don't forget to take your quiz for today!`,
  ios: {
    sound: false,
  },
  android: {
    sound: false
  }
};
