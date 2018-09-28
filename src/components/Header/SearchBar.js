import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
        value: ''
    }
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({value: e.target.value});
  }

  handleSearch(e) {
    e.preventDefault()
    if (!this.props.hasLoadedBefore) {this.props.hasLoaded()}
    if (this.props.isLoaded) {this.props.reload()}
    this.props.search(this.state.value)
    this.clearInput()
  }

  clearInput() {
    this.setState({
        value: ''
    })
  }

  render() {
      return(
        <Form>
        <Label>Search</Label>
        <FormGroup id="search-form">
                <Input 
                  type="text" 
                  className="search-input" 
                  value={this.state.value} 
                  onChange={(e) => {this.handleChange(e)}} 
                  placeholder="search an event title" />   
                <Button 
                  type="submit" 
                  onClick={(e) => {this.handleSearch(e)}} 
                  className="submit-btns">
                  {/* btn text */}
                  Search
                </Button>
        </FormGroup>
    </Form>
      )
  }
}