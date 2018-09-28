import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Paginator.css'

export default class Paginator extends Component {

 handlePageChange(e, value) {
    e.preventDefault()
    if(value < 1) {value = 1}
    this.props.updatePageNumber(value)
 }

  render() {
      return(
        <div id="Paginator">
          <Button className="paginator-btns-s" onClick={(e) => {this.handlePageChange(e, this.props.pageNumber-1)}}>Back</Button>
          <Button className="paginator-btns" onClick={(e) => {this.handlePageChange(e, 1)}}>First</Button>
          <Button className="paginator-btns" id="currentPage" onClick={(e) => {this.handlePageChange(e, this.props.pageNumber)}}>{this.props.pageNumber}</Button>
          <Button className="paginator-btns" onClick={(e) => {this.handlePageChange(e, this.props.pageNumber+1)}}>{this.props.pageNumber+1}</Button>
          <Button className="paginator-btns" onClick={(e) => {this.handlePageChange(e, this.props.pageNumber+2)}}>{this.props.pageNumber+2}</Button>
          <Button className="paginator-btns" onClick={(e) => {this.handlePageChange(e, this.props.pageNumber+3)}}>{this.props.pageNumber+3}</Button>
          <Button className="paginator-btns" onClick={(e) => {this.handlePageChange(e, this.props.pageNumber+4)}}>{this.props.pageNumber+4}</Button>
          <Button className="paginator-btns-s" onClick={(e) => {this.handlePageChange(e, this.props.pageNumber+1)}}>Next</Button>
        </div>
      )
  }
}