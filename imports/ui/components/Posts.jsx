import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from './BaseComponent.jsx';
import Comments from '../components/Comments.jsx';

export default class Posty extends BaseComponent{
  constructor(props) {
    super(props);
  //  const name = props.name;
  this.handleDelete=this.handleDelete.bind(this);
  }
  handleDelete(){
    console.log("deleting");
  }
  render() {
    var id = Meteor.userId();
    const { post, users } = this.props;
    const postUser = users.filter(function( obj ) {
    return obj._id == post.creator;
  });
    const userName = postUser[0].profile.name;
    const userPhoto = postUser[0].profile.photo;
    const userId = postUser[0]._id;
    const userProfile = "/profile/" + userId;
    var postDate = new Date(post.createdAt);
    var deletable = "none";
    if(id==userId){
      deletable = "block";
    }
    //const email = user.emails[0].address;
    //const emailLocalPart = email.substring(0, email.indexOf('@'));
    return (
      <div className="post">
        <a href={userProfile}><img src={userPhoto} alt={userName}/></a>
        <a href={userProfile}><h4>{userName} said:</h4></a>
        <button style={{display: deletable}} className="btn btn-danger" onClick={this.handleDelete}><span className="glyphicon glyphicon-trash"></span></button>
        <p id="postContent">{post.text}</p>
        <p id="postDate">on {postDate.toUTCString()}</p>
        <Comments />
      </div>
    );
  }
}
