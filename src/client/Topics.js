import React, {Component} from 'react';
import topics from '../json/topics.json';
import {Grid, Panel, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import diagram from '../img/VOTP-diagram.png';

const InfoBlock = () => (
    <div className="mb-25">
        <h4 className="mb-15 text-center text-grey mb-15">
            ABOUT THE VOCABULARY TEST
        </h4>
        <p className="text-center center-block test-info mb-15">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <img src={diagram} alt="votp diagram" className="" />
    </div>
);

const SubTopics = ({subtopics, topicId, match}) => (
    <Panel.Body>
        {subtopics.map((subtopic,idx) =>
            <Link to={`${match}topic/${topicId}/subtopic/${idx}`} key={idx}>
                {subtopic}
            </Link>
        )}
    </Panel.Body>
);


export default class Topics extends Component {
    render() {
        const topicsItems = topics.names.map((topic, idx) =>
            <Col xs={6} md={6} key={idx}>
                <Panel bsStyle="primary">
                    <Panel.Heading className="flex content-space-btwn">
                        <Panel.Title componentClass="h3">
                            {topic.topic}
                        </Panel.Title>
                        <Button bsStyle="info" bsSize="xsmall">Test whole topic</Button>
                    </Panel.Heading>
                    <SubTopics subtopics={topic.subTopics}
                               topicId={idx+1}
                               match={this.props.match.url}/>
                </Panel>
            </Col>
        );
        return (
        <div>
            <Grid>
                <InfoBlock />
                <Row>
                    {topicsItems}
                </Row>
            </Grid>
        </div>
        )
    }
}
