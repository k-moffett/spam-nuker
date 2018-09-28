import React, { Component } from 'react';
import { Table } from 'reactstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './Spammers.css'

export default class Spammers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            copied: false
        }
    }

    handleRemoveID(e, index) {
        e.preventDefault() 
        this.props.removeUserID(index)
    }

    getNukeCodes() {
        const spam = this.props.spam
        const allIDs = []
        const str = 'nukeuser --yes '

        spam.map((data) => {
            if (allIDs.includes(data.userID)) {
                console.log('user ID already added')
            } 
            else {
                let temp = str.concat(data.userID+' && ')
            allIDs.push(temp)
            }
            
        })
     
        let newCommand = allIDs.toString().replace(/[,]/g, '')
        let finalNuke = newCommand.slice(0, newCommand.length-3)
        
        return finalNuke
    }

    clear(e) {
        e.preventDefault()
        this.props.clearSpam()
    }

    render() {
        const spam = this.props.spam
        return(

            <div id="Spammers">
                <div id="head">Click on a user ID to remove them from the list.</div>
                <CopyToClipboard text={this.getNukeCodes()}
                    onCopy={() => this.setState({copied: true})}>
                    <button onClick={(e) => {this.clear(e)}} id="nuke">Click here to copy the Nuke codes.</button>
                </CopyToClipboard>

                {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}

                <Table bordered hover>
                    <thead>
                        <tr>
                        <th>User ID</th>
                        <th>Event Title</th>
                        </tr>
                    </thead>

                    <tbody>
                        {spam.map((data, index) => {
                            return(
                                <tr key={index}>
                                    <td><button onClick={(e) => {this.handleRemoveID(e, index)}}>{data.userID}</button></td> 
                                    <td>{data.eventTitle}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }

}
