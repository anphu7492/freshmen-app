import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import {findUser} from '../../api/users/methods.js';
import request from 'superagent';
import Images from '../../api/images/images.js';

export default class ProfilePage extends BaseComponent {
  constructor(props){
    super(props);
    var id = this.props.params.id.trim();
    var userss = Meteor.users.find().fetch();
    const imageData = Meteor.subscribe('images');

    console.log(userss);
    console.log(Meteor.user());
    var userObj = userss.filter(function( obj ) {
      return obj._id == id;
    });
    if(id != Meteor.userId()){
      this.state.notEditable = "none";
    }
    else{
      this.state.notEditable = "inlineBlock";
    }
    this.state.id = id;
    this.state.name = userObj[0].profile.name;
    this.state.role = userObj[0].role;
    this.state.group = userObj[0].group ? userObj[0].group: "unassigned";
    this.state.major = userObj[0].profile.major;
    this.state.school = userObj[0].profile.school;
    this.state.photo = userObj[0].profile.photo;
    this.state.oldfacebook = this.state.facebook = userObj[0].profile.facebook;
    this.state.oldtwitter = this.state.twitter = userObj[0].profile.twitter;
    this.state.oldphone = this.state.phone = userObj[0].profile.phone;
    this.state.emails = userObj[0].emails[0].address;
    this.handleEdit = this.handleEdit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleFacebookChange = this.handleFacebookChange.bind(this);
    this.handleTwitterChange = this.handleTwitterChange.bind(this);
    this.state.editMode = true;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handlePhoneChange(event){
    this.setState ({phone:event.target.value});
  }

  handleFacebookChange(event){
    this.setState ({facebook:event.target.value});
  }

  handleTwitterChange(event){
    this.setState ({twitter:event.target.value});
  }

  handleEdit(){
    var elements = document.querySelectorAll('.edit');
    for(var i=0; i<elements.length; i++){
      elements[i].style.textDecoration = "underline";
      elements[i].style.textDecoration = "underline";
    }
    this.setState({editMode: false});
    document.getElementById("saveform").setAttribute("style","display:inline-block");
    document.getElementById("cancelform").setAttribute("style","display:inline-block");
    document.getElementById("editbutton").setAttribute("style","display:none");
  }

  handleSubmit(){
    var elements = document.querySelectorAll('.edit');
    for(var i=0; i<elements.length; i++){
      elements[i].style.textDecoration = "none";
      elements[i].style.textDecoration = "none";
    }
    Meteor.users.update({_id: Meteor.userId()},
      {$set: {'profile.facebook': this.state.facebook,
        'profile.twitter': this.state.twitter,
        'profile.phone': this.state.phone}
      });

    this.setState({editMode: true});
    document.getElementById("saveform").setAttribute("style","display:none");
    document.getElementById("cancelform").setAttribute("style","display:none");
    document.getElementById("editbutton").setAttribute("style","display:inline-block");
  }

  handleCancel(){

    var elements = document.querySelectorAll('.edit');
    for(var i=0; i<elements.length; i++){
      elements[i].style.textDecoration = "none";
      elements[i].style.textDecoration = "none";
    }

    this.setState({facebook: this.state.oldfacebook});
    this.setState({phone: this.state.oldphone});
    this.setState({twitter: this.state.oldtwitter});

    this.setState({editMode: true});
    document.getElementById("saveform").setAttribute("style","display:none");
    document.getElementById("editbutton").setAttribute("style","display:inline-block");
    document.getElementById("cancelform").setAttribute("style","display:none");
  }


  handleImageUpload() {
    console.log('In handle upload');
    var files = document.querySelector('input[type=file]').files;
    console.log(files);
    var picLink = this.state.photo;
    $.cloudinary.config({
      cloud_name: 'aalto',
    });

    Cloudinary.upload(files, {}, function(err, result)  {
      if (err){
        console.log(err);
        return;
      }
      console.log(result);
      var userId = Meteor.userId();
      picLink = result.secure_url;
      var imagesURL = {
        'profile.photo': picLink
      };
      Meteor.users.update(userId, {$set: imagesURL});

    });
    setTimeout(() => {
      this.setState({
        photo: picLink
      });
    },2000);

  }

  componentWillMount() {
    if(this.state.photo === "unset" || !this.state.photo)
      this.state.photo = "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png";
    if(this.state.phone === "unset" || !this.state.phone)
      this.state.phone = "";
    if(this.state.facebook === "unset" || !this.state.facebook)
      this.state.facebook = "";
    if(this.state.twitter === "unset" || !this.state.twitter)
      this.state.twitter = "";

  };

  render(){
    var mailto = "mailto:" + this.state.emails;


    return (<div id="profile-page">
      <img className="profile-pic" src={this.state.photo}
           alt="Profile photo"/><br />
      <label style={{display:this.state.notEditable}} className="btn btn-success" id="pic-label" htmlFor="pic-selector">Change photo</label>
      <input id="pic-selector"  type="file" name="photo" onChange={this.handleImageUpload}/>
      <h3>{this.state.name}</h3>
      <p>{this.state.role}</p>
      <p>{this.state.major}, {this.state.school}</p>
      <p><a href={mailto}>{this.state.emails}</a></p>

      <p>Phone -
        <input name='phone' className='edit' placeholder="Not available" readOnly={this.state.editMode} onChange={this.handlePhoneChange} value={this.state.phone} />
      </p>

      <p>Facebook -
        <input name='facebook' className='edit' placeholder="Not available" readOnly={this.state.editMode} onChange={this.handleFacebookChange} value={this.state.facebook} />
      </p>
      <p>Twitter -
        <input name='facebook' className='edit' placeholder="Not available" readOnly={this.state.editMode} onChange={this.handleTwitterChange} value={this.state.twitter} />
      </p>
      <button id="editbutton" style={{display:this.state.notEditable}}  className="btn btn-info" onClick={this.handleEdit}>Edit <span className="glyphicon glyphicon-pencil"></span></button>
      <button id="saveform" style={{display:"none"}} className="btn btn-success" onClick={this.handleSubmit}>Save</button>
      <button id="cancelform" style= {{display:"none"}} className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>


    </div>);
  }

}
