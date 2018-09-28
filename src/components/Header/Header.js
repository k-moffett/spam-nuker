import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './Header.css'
import SearchBar from './SearchBar'

export default class Header extends Component {

  render() {
      return(
          <Row id="Header">
            <Col md='2'>
              <h1>Spam-Nuker</h1>
            </Col>
            <Col md='4'>
              <SearchBar 
                search={this.props.search} 
                hasLoaded={this.props.hasLoaded} 
                hasLoadedBefore={this.props.hasLoadedBefore} 
                isLoaded={this.props.isLoaded} 
                reload={this.props.reload} 
              />
            </Col>
            <Col md='6'>
            </Col>
          </Row>
      )
  }
}