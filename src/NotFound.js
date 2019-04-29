import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PageNotFound from './images/PageNotFound.jpg';

class NotFound extends Component {

    render() {
        return (
            <div>
                <img src={PageNotFound} style={{width: '100%', height: '90vh', display: 'block', margin: 'auto', position: 'relative' }} />
                <center><Link to="/">Return to Home Page</Link></center>
            </div>
        );
    }
}
export default NotFound;

