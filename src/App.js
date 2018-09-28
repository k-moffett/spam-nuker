import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'
import './App.css';

import Header from './components/Header/Header'
import DataTable from './components/DataTable/DataTable'
import Paginator from './components/Paginator/Paginator'
import Spammers from './components/Spammers/Spammers'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      hasLoadedBefore: false,
      error: '',
      events: '',
      lastSearchTerm: '',
      pageNumber: 1,
      spam: [],
    }
    this.search = this.search.bind(this)
    this.hasLoaded = this.hasLoaded.bind(this)
    this.reload = this.reload.bind(this)
    this.updatePageNumber = this.updatePageNumber.bind(this)
    this.addUserID = this.addUserID.bind(this)
    this.removeUserID = this.removeUserID.bind(this)
    this.clearSpam = this.clearSpam.bind(this)
  }

  search(searchTerm, value) {
    let pageNumber
    if (!this.state.hasLoadedBefore) {
      pageNumber = 1
    } 
    // else if (!this.lastSearchTerm) {
    //   pageNumber = 1
    //   this.setState({
    //     pageNumber: 1
    //   })
    // }
    else {pageNumber = value}
    fetch(`https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=LkRczZ6Mw7zvVqtS&location=Worldwide&keywords=${searchTerm.trim().replace(/[ ]/g, '+')}?&page_size=20?&page_number=${pageNumber}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          events: result,
          lastSearchTerm: searchTerm
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
          lastSearchTerm: searchTerm
        });
      }
    )
  }

  hasLoaded() {
    this.setState({
      hasLoadedBefore: true
    })
  }

  reload() {
    this.setState({
      isLoaded: false
    })
  }

  displayTable() {
    const { hasLoadedBefore, isLoaded, error, events, lastSearchTerm } = this.state

    if (!hasLoadedBefore) {return <div className='load-error'>Enter a phrase and click Search to get started. You can then click on an Owner ID to add it to the nukelist.</div>}
    else if (!isLoaded) { return <div className='load-error'>Loading...</div>}
    else if (error) { return <div className='load-error'>{error}</div>}
    else if (isLoaded) {
      return <DataTable 
                events={events} 
                lastSearchTerm={lastSearchTerm} 
                addUserID={this.addUserID}
                />}
  }

  updatePageNumber(value) {
    this.setState({
      isLoaded: false,
      pageNumber: value
    }, this.refreshSearch(value))
  }

  refreshSearch(value) {
    this.search(this.state.lastSearchTerm, value)
  }

  addUserID(spam) {
    const newState = this.state.spam.concat(spam)
    this.setState({
      spam: newState
    })
  }

  removeUserID(index) {
    let newState = this.state.spam
    newState.splice(index, 1)
    this.setState({
      spam: newState
    })
  }

  clearSpam() {
    this.setState({
      spam: []
    })
  }

  render() {

    return (
      <Container className="App">
        <Header 
          search={this.search} 
          hasLoaded={this.hasLoaded} 
          hasLoadedBefore={this.state.hasLoadedBefore} 
          isLoaded={this.state.isLoaded} 
          reload={this.reload} 
        />

        <Row>
          <Col md='2'></Col>

          <Col md='8'>
            <Paginator 
              pageNumber={this.state.pageNumber} 
              updatePageNumber={this.updatePageNumber} 
            />
          </Col>

          <Col md='2'></Col>
        </Row>

        <Row>
          <Col md='8'>
            {this.displayTable()}
          </Col>
          <Col md='4'>
            <Spammers 
            spam={this.state.spam} 
            removeUserID={this.removeUserID}
            clearSpam={this.clearSpam}
            />
          </Col>
        </Row>

      </Container>
    );
  }
}