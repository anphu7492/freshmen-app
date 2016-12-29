import React from 'react';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import { displayError } from '../helpers/errors.js';

import { Accounts } from 'meteor/accounts-base';
import { Groups } from '../../api/groups/groups.js';
import { findUser } from '../../api/users/methods.js';

export default class ProfilePage extends BaseComponent {
  constructor(props){
    super(props);
    let id = this.props.params.id.trim();
    let user = Meteor.users.findOne(id);
    let group = Groups.findOne(user.group);
    const groupName = group.name;

    if (id !== Meteor.userId()) {
      this.state.notEditable = "none";
    } else {
      this.state.notEditable = "inlineBlock";
    }
    this.state.id = id;
    this.state.name = user.profile.name;
    this.state.role = user.role;
    this.state.group = groupName;
    this.state.major = user.profile.major;
    this.state.school = user.profile.school;
    this.state.photo = user.profile.photo;
    this.state.oldfacebook = this.state.facebook = user.profile.facebook;
    this.state.oldtwitter = this.state.twitter = user.profile.twitter;
    this.state.oldphone = this.state.phone = user.profile.phone;
    this.state.emails = user.emails[0].address;
    this.state.oldpassword = '';
    this.state.newpassword = '';
    this.state.showSection = 'none';
    this.handleEdit = this.handleEdit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleFacebookChange = this.handleFacebookChange.bind(this);
    this.handleTwitterChange = this.handleTwitterChange.bind(this);
    this.state.editMode = true;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.oldPasswordChange = this.oldPasswordChange.bind(this);
    this.newPasswordChange = this.newPasswordChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCancelPasswordChange = this.handleCancelPasswordChange.bind(this);
    this.showPasswordSection = this.showPasswordSection.bind(this);
    this.passwordError = this.passwordError.bind(this);
  }

  showPasswordSection(){
    this.setState ({showSection:"block"});
  }
  handlePhoneChange(event){
    this.setState ({phone:event.target.value});
  }

  oldPasswordChange(event){
    this.setState ({oldpassword:event.target.value});
  }

  newPasswordChange(event){
    this.setState ({newpassword:event.target.value});
  }

  passwordError(error){
    if(error){
      toastr.error("Failed: " + error);
    }
    else {
      toastr.success("Password changed successfully");
      this.setState ({showSection:"none"});
      this.setState ({newpassword:""});
      this.setState ({oldpassword:""});
    }

  }

  handleCancelPasswordChange(){
    this.setState ({showSection:"none"});
  }

  handlePasswordChange(event){
    Accounts.changePassword(this.state.oldpassword, this.state.newpassword, this.passwordError);
  }

  handleFacebookChange(event){
    this.setState ({facebook:event.target.value});
  }

  handleTwitterChange(event){
    this.setState ({twitter:event.target.value});
  }

  handleEdit(){
    let elements = document.querySelectorAll('.edit');
    for(let i=0; i<elements.length; i++){
      elements[i].style.textDecoration = "underline";
      elements[i].style.textDecoration = "underline";
    }
    this.setState({editMode: false});
    document.getElementById("saveform").setAttribute("style","display:inline-block");
    document.getElementById("cancelform").setAttribute("style","display:inline-block");
    document.getElementById("editbutton").setAttribute("style","display:none");
  }

  handleSubmit(){
    let elements = document.querySelectorAll('.edit');
    for(let i=0; i<elements.length; i++){
      elements[i].style.textDecoration = "none";
      elements[i].style.textDecoration = "none";
    }
    Meteor.users.update({_id: Meteor.userId()},
      {$set: {'profile.facebook': this.state.facebook,
        'profile.twitter': this.state.twitter,
        'profile.phone': this.state.phone}
      });

    this.setState({oldfacebook: this.state.facebook});
    this.setState({oldphone: this.state.phone});
    this.setState({oldtwitter: this.state.twitter});

    this.setState({editMode: true});
    document.getElementById("saveform").setAttribute("style","display:none");
    document.getElementById("cancelform").setAttribute("style","display:none");
    document.getElementById("editbutton").setAttribute("style","display:inline-block");
  }

  handleCancel(){

    let elements = document.querySelectorAll('.edit');
    for(let i=0; i<elements.length; i++){
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
    let files = document.querySelector('input[type=file]').files;
    let picLink = this.state.photo;
    $.cloudinary.config({
      cloud_name: 'aalto',
    });

    Cloudinary.upload(files, {}, (err, result) => {
      if (err){
        displayError(err);
        return;
      }
      let userId = Meteor.userId();
      picLink = result.secure_url;
      let imagesURL = {
        'profile.photo': picLink
      };

      Meteor.users.update(userId, {$set: imagesURL}, (err, res) => {
        if (err) {
          displayError(err);
        } else {
          this.setState({
            photo: picLink
          });
        }
      });
    });
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

  render() {
    const mailto = "mailto:" + this.state.emails;

    return (
      <div id="profile-page">
        <a href="/" className="btn btn-danger backhome">Back to dashboard</a>
        <br /><br />
        <img className="profile-pic" src={this.state.photo}
             alt="Profile photo"/><br />
        <label style={{display:this.state.notEditable}} className="btn btn-success" id="pic-label" htmlFor="pic-selector">Change photo</label>
        <input id="pic-selector"  type="file" name="photo" onChange={this.handleImageUpload}/>
        <h3>{this.state.name}</h3>
        <p>{this.state.role.toUpperCase()}</p>
        <p>{this.state.major}, {this.state.school}</p>
        <p><a href={mailto}>{this.state.emails}</a></p>

        <table id="info-table">
          <tbody>
          <tr>
            <td>Group </td><td>{this.state.group}</td>
          </tr>
          <tr>
            <td>Phone </td>
            <td>  <input name='phone' className='edit' placeholder="Not available" readOnly={this.state.editMode} onChange={this.handlePhoneChange} value={this.state.phone} />
            </td>
          </tr>
          <tr>
            <td>Facebook </td>
            <td><input name='facebook' className='edit' placeholder="Not available" readOnly={this.state.editMode} onChange={this.handleFacebookChange} value={this.state.facebook} />
            </td>
          </tr>
          <tr>
            <td>Twitter </td>
            <td><input name='facebook' className='edit' placeholder="Not available" readOnly={this.state.editMode} onChange={this.handleTwitterChange} value={this.state.twitter} />
            </td>
          </tr>
          </tbody>
        </table>


        <button id="editbutton" style={{display:this.state.notEditable}}  className="btn btn-info" onClick={this.handleEdit}>Edit info <span className="glyphicon glyphicon-pencil"></span></button>
        <button id="saveform" style={{display:"none"}} className="btn btn-success" onClick={this.handleSubmit}>Save</button>
        <button id="cancelform" style= {{display:"none"}} className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>

        <br /><button id="modifyPassword" style={{display:this.state.notEditable}} onClick={this.showPasswordSection}>Modify password <span className="glyphicon glyphicon-lock"></span></button>
        <div id="password-section" style= {{display:this.state.showSection}}>
          <p>Old password -
            <input name='oldpassword' type="password" className='edit'   onChange={this.oldPasswordChange} value={this.state.oldpassword} />
          </p>
          <p>New Password -
            <input name='newpassword' type="password" className='edit'   onChange={this.newPasswordChange} value={this.state.newpassword} />
          </p>

          <button id="password-change" className="btn btn-success" onClick={this.handlePasswordChange}><span className="glyphicon glyphicon-pencil"></span>Change password</button>
          <button id="cancelform" className="btn btn-danger" onClick={this.handleCancelPasswordChange}>Cancel</button>

        </div>
      </div>
    );
  }

}
