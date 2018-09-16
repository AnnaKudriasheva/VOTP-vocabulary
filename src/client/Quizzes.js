import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Quizzes extends Component {
    render() {
        return (
            <div>
                <Link to={`${this.props.match.url}/type/1`}>Test</Link>
                <p>{this.props.match.params.topicId}</p>
                <p>{this.props.match.params.subtopicId}</p>
            </div>

        )
    }
}