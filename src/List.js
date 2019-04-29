import React, {Component} from 'react';
import {Link} from "react-router-dom";

import Question from './Question';
import AddQuestion from './AddQuestion';

class List extends Component {

    render() {
        
        let items = this.props.questions.map((doc) =>
            <Link to={`/question/${doc._id}`}><p>{doc.title}</p></Link>);
            

        return (
            <div>
                <h3>{this.props.header}</h3>
                <div className="card">
                    <div className="card-header">
                        
                    </div>
                    <div className="card-body">
                        <ol className="list-group" id="itemList">
                            {items}
                        </ol>
                    </div>
                    <div>
                        <AddQuestion
                            addQuestion={this.props.addQuestion}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
