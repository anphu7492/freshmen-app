import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import { Link } from 'react-router';

export default class ContactUs extends BaseComponent {

  constructor(props){
    super(props);
    this.state.showSection = 'Block';
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
  console.log("submit")
  event.preventDefault();
  this.setState ({showSection:"none"});
  }

    render() {
        return (
            <div style= {{display:this.state.showSection}}>&nbsp;
              <br/> <br/>
                <p id="contact-description">How can we help you?</p>
                <br/>
                <div className="contact-us-form">
                        <div class="row">
                            <label for="subject" className="contact-label">Subject:</label><br/>
                            <input id="contact-subject" className="contact-subject" type="text" size="52"/>
                        </div>
                        &nbsp;&nbsp;
                        <div class="row">
                            <label for="message" className="contact-label">Your message:</label><br/>
                            <textarea id="contact-input-message" class="contact-input-message" name="message" rows="7" cols="60"></textarea>
                        </div>
                        &nbsp;
                        <div class="row">
                           <Link to="/"> <input id="contact-submit-btn" className="contact-submit-btn" type="submit" value="Send email"/></Link>
                        </div>
                </div>
            </div>
        )
    }
}
