import React, {Component} from 'react';
import Topics from './Topics';
import Quizzes from './Quizzes';
import Header from './Header';
import Footer from './Footer';
import Questions from './Questions';
import Results from './Results';
import {HashRouter as Router, Route} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Topics} />
        <Route exact path="/results" component={Results} />
        <Route
          exact
          path="/topic/:topicId/subtopic/:subtopicId" component={Quizzes} />
        <Route
          path="/topic/:topicId/subtopic/:subtopicId/type/:typeId"
          component={Questions} />
        <Footer />
      </div>
    </Router>
  )
};
