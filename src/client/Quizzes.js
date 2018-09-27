import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Grid, Panel} from 'react-bootstrap';

import quizPanelImg1 from '../img/quiz-panel-1.png';
import quizPanelImg2 from '../img/quiz-panel-2.png';


const quizImages = [quizPanelImg1, quizPanelImg2];


const quizTypes = [
    {
        name: 'Fill in the gaps',
        description: 'Choose most compatible for for the sentence.'
    },
    {
        name: 'Drag-and-drop',
        description: 'Drag and drop right words.'
    }
];

export const QuizPanels = ({matchUrl}) => (
    quizTypes.map((item, idx) =>
        <Link
          to={{
            pathname: `${matchUrl}/type/${idx+1}`,
            state: {url: `${matchUrl}/type/${idx+1}`}}}
            key={idx}>
            <Panel>
                <Panel.Body>
                    <div className="flex">
                        <img src={quizImages[idx]} alt="" className="quiz-img mr-25"/>
                        <div>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        </Link>
    )
);


export default class Quizzes extends Component {
    render() {
        return (
            <Grid>
                <QuizPanels matchUrl={this.props.match.url}/>
            </Grid>
        )
    }
}