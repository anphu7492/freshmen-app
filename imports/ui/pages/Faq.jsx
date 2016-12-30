import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';

export default class Faq extends BaseComponent {

    render() {
        return (
            <div id="faq">
                <br/><br/>
                <p className="faq-title">Frequently Asked Questions </p>
                <br />
                <br />
                <div className="questions">
                    <p className="faq-question">How do I sign in to freshmen guide?</p>
                    <ul>
                    <li className="faq-answer">
                        Study coordinator will create an account for you on the freshmen guide application.
                    </li>
                    <li className="faq-answer">
                        He/She shares the credentials to your Registered E-mail id.
                    </li>
                    </ul>
                    <br/>
                    <p className="faq-question">How do I know about the events organized in Aalto university?</p>
                    <ul>
                    <li className="faq-answer">
                        Tutor of your assigned group or Study Coordinator publishes the event details through freshmen web.
                    </li>
                    </ul>
                    <br/>
                    <p className="faq-question">Who will be creating the groups?</p>
                    <ul>
                    <li className="faq-answer">
                        Study Coordinator is responsible for creating create groups and assign tutors to the group.
                    </li>
                    </ul>

                    <br/>
                    <p className="faq-question">Is it possible that a group to have more than One Tutor?</p>
                    <ul>
                    <li className="faq-answer">
                        Yes, There can be be more than one tutor for a group
                    </li>
                    </ul>
                    <br/>

                    <p className="faq-question">How do I reset the deafult password Genereated by the Study Coordinator?</p>
                    <ul>
                    <li className="faq-answer">
                        Once you are logged in, My profile page allows you to change the default password.
                    </li>
                    </ul>

                    <br/>
                    <p className="faq-question">Am I allowed to change my Email id?</p>
                    <ul>
                    <li className="faq-answer">
                        No, You can't change the Email Id, programme name and your role.
                    </li>
                    </ul>
                    <br/>

                    <p className="faq-question">Can I share my personal to-do with everyone?</p>
                    <ul>
                    <li className="faq-answer">
                        Yes, students and tutors can create their private todos and click on 'make public' to make it available for everyone to view.
                    </li>
                    </ul>
                    <br/>

                </div>
            </div>
        )
    }
}
