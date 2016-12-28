import React from 'react';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import UserInfo from './UserInfo.jsx';

export default class Profiles extends BaseComponent {
  constructor(props){
    super(props);
  }

  render() {

    const {user} = this.props;

    return (
      <div className="profiles">
        <UserInfo user={user}/>
        <hr/>
      </div>
    );
  }
}

Profiles.propTypes = {
  user: React.PropTypes.object
};