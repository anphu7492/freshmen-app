import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';

export default class Faq extends BaseComponent {

    render() {
        return (
            <div id="faq">
                <br/><br/>
                <p id="faq-title">Freshmen Guide | Frequently Asked Questions</p>
                &nbsp;
                <div className="questions">
                    <p className="faq-question">How do I sign in to freshmen guide?</p>
                    <p className="faq-answer">
                        1.Study coordinator will create an account for you freshmen guide application.</p>
                    <p className="faq-answer">
                        2.He/She shares the credentials through your Registered E-mail id.</p>
                    <br/><br/>
                    <p className="faq-question">How do I know about the events organized in Aalto university.?</p>
                    <p className="faq-answer">
                        Tutor of your assigned group or Study Coordinator publishes the event details through freshmen web.</p>
                </div>
            </div>

        )
    }
}
