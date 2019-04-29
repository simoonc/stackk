import React, {Component} from 'react';
import {Link} from "react-router-dom";

import Question from './Question';
import AddComment from './AddComment';
import Comment from "./Comment";

class CommentList extends Component {

    render() {
        let list= [];

       this.props.comments.forEach((comment)=>{
           list.push(

                   <Comment
                       comment={comment.comment}
                       vote={comment.vote}
                       questionId={this.props.id}
                       commentId={comment._id}
                   />

           )
       })
        

        return (
            <div>
                <h3>{this.props.header}</h3>
                <div className="card">
                    <div className="card-header">
                        The questions
                    </div>
                    <div className="card-body">
                        <ol className="list-group" id="itemList">
                            {list}
                        </ol>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

export default CommentList;
