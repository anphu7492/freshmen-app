import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';

export default class ContactUs extends BaseComponent {
    render() {
        return (
            <div>&nbsp;
              <br/> <br/>
                <p id="contact-description">How can we help you?</p>
                <br/>
                <div className="contact-us-form">
                    <form id="contact_form" action="http://localhost:3000" method="POST" enctype="multipart/form-data">
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
                            <input id="contact-submit-btn" className="contact-submit-btn" type="submit" value="Send email"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
