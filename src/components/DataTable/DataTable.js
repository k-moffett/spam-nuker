import React, { Component } from 'react';
import { Table } from 'reactstrap';
import './DataTable.css'

export default class DataTable extends Component {

  handleAddUserID(e, userID, eventTitle) {
      e.preventDefault()
      if (userID === 'evdb') {return}
      let spam = {
          userID: userID,
          eventTitle: eventTitle
      }
      this.props.addUserID(spam)
  }

  render() {
      const events = this.props.events.events
      const lastSearchTerm = this.props.lastSearchTerm
      return(     
        <div id='DataTable'>       
            <h3>results for: "{lastSearchTerm}"</h3>
            <Table bordered hover>
            <thead>
                <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Owner</th>
                </tr>
            </thead>

            <tbody>
                            
                {events.event.map((event) => {
                        return(
                            <tr key={event.id}>
                                <td><div className="title"><a href={event.url} target="_blank">{event.title}</a></div></td>
                                <td><div className="description">{event.description}</div></td>
                                <td onClick={(e) => {this.handleAddUserID(e, event.owner, event.title)}}>{event.owner}</td>
                            </tr>
                        )
                    })}
            </tbody>
            </Table>
            </div>
            )
   } 

}