import React, {Component} from 'react';
import {Grid, Jumbotron} from 'react-bootstrap';

import '../style/header.scss';

import bg from '../img/bg.jpg';

const Header = () => (
  <Grid style={{ backgroundImage: 'url(' + bg + ')' }} className="mb-15" fluid>
    <Grid>
      <Jumbotron
        className="text-white mb-0"
        style={{ backgroundColor: 'inherit' }}>
        <h1>Hello, student!</h1>
        <p>
          How strong is your vocabulary? Let's check :)
        </p>
      </Jumbotron>
    </Grid>
  </Grid>
);

export default Header;



