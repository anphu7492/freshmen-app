import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';
import MobileMenu from '../components/MobileMenu.jsx';
import { GoogleMap, Marker, SearchBox } from "react-google-maps";
import $ from "jquery";
//import Posts from '../components/Posts.jsx';
import Tasks from '../components/Tasks.jsx';
import Posty from '../components/Posts.jsx';
import Events from '../components/Events.jsx';
import PostCreate from '../components/post-create/PostCreate';
import EventLocator from '../components/EventLocator';
import { Groups } from '../../api/groups/groups.js';
import { Posts } from '../../api/posts/posts.js';

export default class TutorDashboard extends BaseComponent {
  constructor(props) {
    super(props);
    const users = Meteor.users.find().fetch();
    const id = Meteor.userId();



    this.state.tasks = Posts.find({type: "task", creator: Meteor.userId()}).fetch();
    this.state.otherPosts = Posts.find({type: {$not: "task"}}).fetch();

    this.update = this.update.bind(this);
  }

  update(){
    this.setState({otherPosts: Posts.find({type: {$not: "task"}}).fetch()});


  }

  render() {
    const user = this.props;
    console.log(this.state.otherPosts);
    let postsToDisplay = [];
    for (let i = 0;  i < this.state.otherPosts.length ; i++ ) {
      postsToDisplay.push(<Posty key={i} name="Post" content={this.state.otherPosts[i].text} />);
    }

    return (

      <div className="tutor-dashboard">
        <div className ="tutor-main">
          <PostCreate callBack={this.update}></PostCreate>

          <div className="mapDiv">
            <EventLocator/>
          </div>

          {postsToDisplay}
        </div>
      </div>
    );
  }
}

TutorDashboard.propTypes = {
  user: React.PropTypes.object,
};
