import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import quiz from '../json/quiz.json';
import {Redirect, hashHistory} from 'react-router-dom';


const searchByIdJSON = (arr, id) => {
  return arr.find((el) => {
    if (el.id === id) {
      return el;
    }
  });
};

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const parseQuestionString = (string) => {
  if (string) {
    let idx = string.indexOf('*gap*');
    return [string.slice(0, idx), string.slice(idx + 5)];
  } else {
    return [];
  }
};

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCounter: 0,
      topicId: this.props.match.params.topicId,
      subtopicId: this.props.match.params.subtopicId,
      typeId: this.props.match.params.typeId,
      questions: [],
      answers: [],
      userAnswers: [],
      wrongAnswers: [],
      quizComplete: false,
      score: 0
    };

    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentWillMount() {
    const topic = searchByIdJSON(quiz.quizzes, this.state.topicId);
    let questions = [];

    if (this.state.subtopicId === '0') {
      topic.subtopics.map((subtopic) => {
        subtopic.type[this.state.topicId - 1].questions.map((item) => {
          questions.push(item);
        })
      });
    } else {
      let subtopic = searchByIdJSON(topic.subtopics, this.state.subtopicId);
      let quizType = searchByIdJSON(subtopic.type, this.state.typeId);

      questions = shuffle(quizType.questions);
    }

    this.setState({questions: questions.map((item) => item)});
  }

  handleNextQuestion(e) {
    const targetId = e.target.id;
    if (this.state.questionCounter < this.state.questions.length - 1) {
      this.setState({
        questionCounter: this.state.questionCounter + 1
      });
    } else {
      this.setState({
        quizComplete: true
      });
    }
    this.checkAnswer(targetId);
    this.setUserAnswer(targetId);
  }

  checkAnswer(targetId) {
    let questionCounter = this.state.questionCounter;
    if (this.state.questions[questionCounter].correctAnswer !== targetId) {
      this.setState({
        wrongAnswers: [...this.state.wrongAnswers,
          this.state.questions[questionCounter]]
      });
    }
  }

  setUserAnswer(id) {
    this.setState({
      userAnswers: [...this.state.userAnswers, id]
    });
  };

  calculateScore() {
    return 100 - ((this.state.wrongAnswers.length * 100) /
      this.state.questions.length);
  }

  render() {
    const counter = this.state.questionCounter;
    const question = parseQuestionString(this.state.questions[counter].question);

    const answers = this.state.questions[counter].answers.map((answer, idx) =>
      <li
        key={idx}
        id={idx + 1}
        onClick={this.handleNextQuestion}
        className="answer-item">
        {answer}
      </li>
    );

    if (this.state.quizComplete === true) {
      return <Redirect to={{
        pathname: '/results',
        state: {
          wrong: this.state.wrongAnswers,
          questionCount: this.state.questions.length,
          score: this.calculateScore(),
          quizPath: this.props.location.pathname
        }
      }}/>;
    }

    return (
      <Grid>
        <h4 className="mb-15 question-header">QUESTION {counter + 1}
          / {this.state.questions.length}</h4>
        <div className="question-container">
          <p>
            {question[0]}
            <span className="gap-field" />
            {question[1]}
          </p>
          <ul>
            {answers}
          </ul>
        </div>
      </Grid>
    )
  }
}