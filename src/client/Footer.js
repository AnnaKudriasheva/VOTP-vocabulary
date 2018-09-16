import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

const Footer = () => (
    <Grid style={{backgroundColor: "#044785"}}
          className="text-center text-white pa-15 footer"
          fluid>
        &copy; {(new Date().getFullYear())} &nbsp;
        Copyright:
        <a href="https://www.ccsf.edu/" className="text-white">
            City Colledge of San Francisco
        </a>
    </Grid>
);

export default Footer;
