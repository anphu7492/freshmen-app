import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';

export default class ContactUs extends BaseComponent {

    render() {
        return (
            <div id="contactUs">
                <br/><br/>
                <p id="contact-description">Contact us!</p>
                <br/><br/>
                <p className="contact-content">If you have any questions, suggestions or complaints, please feel free to drop us an email.</p>
                <br/>
                <p className="contact-content">We will get back to you as soon as we can!</p>
                <br/>
                <p className="contact-content">Please reach out to us <a href="mailto:abhishek.shetty@aalto.fi" target="_top">here!</a>
                </p>
            </div>
        )
    }
}
