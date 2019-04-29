import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Comment from './Comment';
import AddComment from './AddComment';
import CommentList from './CommentList';

class Question extends Component {
    API_URL = process.env.REACT_APP_API_URL;
    
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            question: "",
        }


            fetch(`${this.API_URL}/question/${props.match.params.id}`)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((questions) => {
                    this.setState({
                        question: questions
                    });
                })
                .catch(error => { // Any errors in the above will get caught here
                    console.error(error);
                })

    }
    render() {
        let content = 'LOAAAAAAD';
        if(this.state.question){
            let question = this.state.question;
            content =
                <div>
                    <div>
                        <p className="q_title">Title: {question.title}</p>
                        <p className="q_question">Question: {question.question}</p>
                    </div>
                    <div className="comments_list">

                    </div>
                    <div>
                        <CommentList
                            comments={this.state.question.comments}
                            id={this.props.id}
                        />
                    </div>
                    <div>
                        <AddComment
                            addComment={this.props.addComment}
                            id={this.props.id}
                        />
                    </div>
                    <Link to={'/'}> Forside</Link>
                </div>
        }
        return content;
    }
}


export default Question;