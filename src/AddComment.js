import React, {Component} from 'react';


class AddComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment:'',
            vote:0
        };

        this.onChangeComment = this.onChangeComment.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }


    onChangeComment(event) {
        this.setState({
            comment: event.target.value
        });
    }
    
    handleInput(event) {
        event.preventDefault();
        this.props.addComment(this.state.comment, this.props.id)
        

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
                                   onChange={this.onChangeComment}
                            />
                            
                            <small className="form-text text-muted">
                                    
                            </small>
                        </div>
                        <button onClick={this.handleInput}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Add Comment
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}


export default AddComment;

