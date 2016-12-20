import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import Comments from '../components/Comments.jsx';
import MyMap from '../components/MyMap.js';
import PinEventLocation from '../components/PinEventLocation.jsx';

export default class Tasks extends React.Component {
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
    //  var style1 = { .embedded-map-display .map-generator{max-width: 100%; max-height: 100%; background: none;} ;
        return (
            <div className="tasks">
                  <p className="eventtitle">Register at AYY - Deadline 01 September 2017
                    </p>
                  <p className="inlinetitle">Tutor Instructions </p>
                  <p className="instructions">
                    1. Collect below documents<br />
                  2. Go to Ayy office<br />
                3. Pay union fees.

                  </p>
                  <p className="inlinetitle">Required documents</p>
                  <p className="instructions">Letter of Admission, Passport, RP card </p>
                  <div className="event-location">
                    <p className="inlinetitle">Where?</p>
                    <div ClassName="mapdiv">
                      <PinEventLocation longitude="60.1867" latitude="24.8277"/>
                      </div>
                  </div>
                  <button onClick = {this.updateState} className="btn-success close-button"
                  name="button" value="OK" type="button">Mark as Completed</button>

                  <Comments />
            </div>
        );
    }
}
