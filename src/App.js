import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import List from './List';
import AddQuestion from "./AddQuestion";
import Question from "./Question";
import NotFound from "./NotFound";
import CommentList from "./CommentList";

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            comments:[]
        };

        this.addQuestion = this.addQuestion.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        console.log("App component has mounted");
        this.getData();
    }
    getData() {
        fetch(`${this.API_URL}/questions`)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((questions) => {
                this.setState({
                    questions
                });
            })
            .catch(error => { // Any errors in the above will get caught here
                console.error(error);
            })
    }

    addQuestion(title, question) {
        let newQuestion = {
            title: title,
            question: question
        };
            fetch(`${this.API_URL}/questions`, {
                method: 'POST',
                body: JSON.stringify(newQuestion),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

                .then(response => response.json())
                .then(json => {
                    console.log("Result of posting a new task:");
                    console.log(json);
                    this.getData()
                })

        this.setState({
            questions: [...this.state.questions, newQuestion]

        });
    }
    
    /**** ADDS A NEW COMMENT *****/

    addComment(comment, id) {
        let newComment = {
            comment: comment,
            id: id
        };
        fetch(`${this.API_URL}/api/question/comment/${id}`, {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new task:");
                console.log(json);

            })
            .then(()=>{
                this.setState({
                    comment:''
                })
            });
        this.getData()
        this.setState({
            comments: [...this.state.comments, newComment]

        });
    }
    
    
    getQuestionFromId(id) {
        return this.state.questions.find((elm) => elm.id === Number(id));
    }

    render() {
        return (
            <div className="container">
                <Router>
                    <div className="container">
                        <Switch>
                            <Route exact path={'/'}
                                   render={(props) =>
                                       <List {...props}
                                                   questions={this.state.questions}
                                                   header={'All questions'}
                                                   addQuestion={this.addQuestion}/>}
                            />

                            <Route exact path={'/question/:id'}
                                   render={(props) => <Question {...props} 
                                                                question={this.getQuestionFromId(props.match.params.id)}
                                                                addComment={this.addComment}
                                                                id={props.match.params.id}
                                                                />}
                            />


                            <Route component={NotFound} />
                        </Switch>

                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
