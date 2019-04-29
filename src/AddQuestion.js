import React, {Component} from 'react';


class AddQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            question: ""
        };
    
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }


    onChangeTitle(event) {
        this.setState({
            title: event.target.value
        });
    }
    onChangeQuestion(event) {
        this.setState({
            question: event.target.value
        });
    }

    handleInput(event) {
        event.preventDefault();
        this.props.addQuestion(this.state.title, this.state.question);
        /*this.setState(
            question
        )*/
        //this.state.title.value= '';
        //this.state.question.value= '';
        //this.state.addQuestion(this.state.question);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="itemText">New Item</label>
                            <input type="text" className="form-control" id="itemText"
                                   placeholder="title"
                                   onChange={this.onChangeTitle}
                            />
                            <input type="text" className="form-control" id="itemText"
                                   placeholder="question"
                                   onChange={this.onChangeQuestion}
                            />
                            <small className="form-text text-muted">
                            </small>
                        </div>
                        <button onClick={this.handleInput}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Add Question
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}


export default AddQuestion;

