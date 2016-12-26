import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';

export default class Faq extends BaseComponent {

    render() {
        return (
            <div id="faq">
                <br/><br/>
                <p className="faq-title">Frequently Asked Questions </p>
                &nbsp;
                <div className="questions">
                    <p className="faq-question">How do I sign in to freshmen guide?</p>
                    <ul>
                    <li className="faq-answer">
                        Study coordinator will create an account for you freshmen guide application.
                    </li>
                    <li className="faq-answer">
                        He/She shares the credentials through your Registered E-mail id.
                    </li>
                    </ul>
                    <br/>
                    <p className="faq-question">How do I know about the events organized in Aalto university.?</p>
                    <ul>
                    <li className="faq-answer">
                        Tutor of your assigned group or Study Coordinator publishes the event details through freshmen web.</li>
                   </ul>
                </div>
            </div>
        )
    }
}
