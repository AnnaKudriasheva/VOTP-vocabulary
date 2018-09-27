import React, {Component} from 'react';
import {Grid, Button} from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';
import {parseQuestionString} from './Questions';
import PropTypes from 'prop-types';

ResultCircle.propTypes = {
  header: PropTypes.string,
  data: PropTypes.node,
  color: PropTypes.string
};

function ResultCircle({header, data, color}) {
  return(
    <div>
      <h4 className="text-center mb-25">{header}</h4>
      <span className={`center-block score-circle ${color}`}>
        <span>{data}</span>
      </span>
    </div>
  )
}

export default class Results extends Component {
  render() {
    if (!this.props.location.state) {
      return <Redirect to="/"/>
    }

    const mistakes = this.props.location.state.wrong.map((item, idx) => {
        const question = parseQuestionString(item.question);
        return (<li key={idx}>
          {question[0]}
          <span className="text-success">
            {item.answers[item.correctAnswer - 1]}
          </span>
          {question[1]}
        </li>)
      }
    );

    return (
      <Grid>
        <div className="flex mobile-column content-space-around mb-25
        circle-score-container">
          <ResultCircle
            header="YOUR SCORE"
            data={Math.round(this.props.location.state.score) + '%'}
            color="score-circle-default"
          />
          <ResultCircle
            header="CORRECT ANSWERS"
            data={this.props.location.state.questionCount}
            color="score-circle-success"
          />
          <ResultCircle
            header="WRONG ANSWERS"
            data={this.props.location.state.wrong.length}
            color="score-circle-errors"
          />
        </div>
        {this.props.location.state.wrong.length !== 0 ?
          <div className="mb-35">
            <h4 className="text-center mb-25">
              You made mistakes in the following questions:
            </h4>
            <ul className="text-center center-block wrong-answers-list">
              {mistakes}
            </ul>
          </div> :
          <div className="text-center">
            <p>Congratulations! You passed the test without errors :)</p>
          </div>
        }
        <div className="flex content-center mobile-column mb-35">
          <Link to="/">
            <Button
              bsStyle="success"
              className="f-width-button mr-25 mobile-m-0"
              bsSize="large">
              Back to Homepage
            </Button>
          </Link>
          <Link to={this.props.location.state.quizPath}>
            <Button
              bsStyle="primary"
              className="f-width-button"
              bsSize="large">
              Test again
            </Button>
          </Link>
        </div>
      </Grid>
    )
  }
}
