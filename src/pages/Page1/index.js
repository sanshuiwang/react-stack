import React, {Component} from 'react';
import './style.css';
import './style-scss.scss';
import image from './images/mkt_05.png';

export default class Page1 extends Component {
    render() {
        return (
            <div className="main">
                <p className="content">this is Page1~</p>
                <img src={image}/>
                <div className="page-box">page-box</div>
            </div>
        )
    }
}
