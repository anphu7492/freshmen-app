import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';

export default class Tutor extends React.Component {
    render() {
        return (
            <div className="Tutor">
                <div className="tutor-image">
                <img src="http://userproplugin.com/userpro/wp-content/plugins/userpro/img/default_avatar_male.jpg"
                     height="80px" width="80px" alt="Student Image"/>                     
                     <p className="profile-name">Mark Alan</p>
                     <p className="profile-school">Master of Science, CCIS</p>
                     <p className="profile-school">AaltoCS Guild</p>
                     <img src="https://www.seeklogo.net/wp-content/uploads/2016/09/facebook-icon-preview.png"
                               height="40px" width="40px" alt="Facebook"/>
                     <img src="https://www.seeklogo.net/wp-content/uploads/2015/09/twitter-icon-circle-logo.png"
                               height="38px" width="38px" alt="Twitter"/>
                </div>
            </div>
        );
    }
}
