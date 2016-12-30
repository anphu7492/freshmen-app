import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';

export default class ContactUs extends BaseComponent {

    render() {
        return (
            <div>
                <br/><br/>
                <p id="contact-description">Get in Touch</p>
                <br/><br/>
                <p className="contact-content">If you have any Questions, Please feel free to drop us an email.</p>
                <br/>
                <p className="contact-content">We will get back to you as soon as we can!.</p>
                <br/>
                <p className="contact-content">Please Reach us at:&nbsp;&nbsp;<a href="mailto:freshmenweb.outlook.com?Subject=Hello%20again" target="_top">freshmenweb.outlook.com</a>
                </p>
            </div>
        )
    }
}
