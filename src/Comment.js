import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

class Comment extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            vote: 0
        }
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);

    }

    /*upVote(event) {
        event.preventDefault();
        this.setState({
            vote: this.state.vote++
        });
    }*/


    downVote(event) {
        event.preventDefault();
        this.setState({
            vote: this.state.vote - 1
        });
    }


    upVote(e) {
        e.preventDefault();
        console.log(e.target);
        fetch(`${this.API_URL}/question/${this.props.questionId}/comment/${e.target.className}`, {
        method: 'PUT',
            body: JSON.stringify(
            {
                vote: this.props.vote + 1
            }
        ),
            headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
}
    downVote(e) {
        e.preventDefault();
        console.log(e.target);
        fetch(`${this.API_URL}/question/${this.props.questionId}/comment/${e.target.className}`, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    vote: this.props.vote - 1
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }
    
    render() {


        return(

        <li>
            {this.props.comment}<br/>
            {this.props.vote}
            <button onClick={this.upVote}
                                     id="voteBtn" className={this.props.commentId}>vote up
        </button>
            <button onClick={this.downVote}
                     className={this.props.commentId}>vote down
            </button>



        </li>
    )
    }
}


export default Comment;