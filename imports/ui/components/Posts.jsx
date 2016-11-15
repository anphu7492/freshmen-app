import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from './BaseComponent.jsx';
import Comments from '../components/Comments.jsx';

export default class Posts extends BaseComponent{
  constructor(props) {
    super(props);
  //  const name = props.name;
  }

  render() {
    var user = Meteor.user();
    const { name } = this.props;
    //const email = user.emails[0].address;
    //const emailLocalPart = email.substring(0, email.indexOf('@'));
    return (
      <div className="post">
        <a href="/profile"><img src="http://userproplugin.com/userpro/wp-content/plugins/userpro/img/default_avatar_male.jpg" alt="sup" /></a>
        <a href="#"><h4>{name} said:</h4></a>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <Comments />
      </div>
    );
  }
}
