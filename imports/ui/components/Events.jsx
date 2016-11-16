import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import Comments from '../components/Comments.jsx';
import EventAcceptance from '../components/Accept.jsx';
import MyMap from '../components/MyMap.js';

export default class Events extends React.Component {
constructor(props) {
super(props);

this.state = {
data: 'Initial data...'
}

this.updateState = this.updateState.bind(this);
};

updateState(e) {
this.setState({data: 'Data updated...'})
}
    render() {
        return (
            <div className="tasks">
                  <p className="eventtitle">Aalto Party!!!
                  </p>
                  <p className="inlinetitle">Tutor Instructions </p>
                  <p className="instructions">Go have fun at the biggest party in Espoo area in September! Don't forget to carry your IDs.</p>
                  <p className="inlinetitle">Required documents</p>
                  <p className="instructions">None </p>
                  <div className="event-location">
                      <p className="inlinetitle">Where?</p>
                      <MyMap />
                    </div>


                  <EventAcceptance/>
                  <Comments/>

            </div>
        );
    }
}
