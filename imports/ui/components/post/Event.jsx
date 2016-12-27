import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../BaseComponent.jsx';
import { displayError } from '../../helpers/errors.js';
import {
  markEventConfirmation
} from '../../../api/posts/methods.js';
import Locator from '../Locator.jsx';

export default class Event extends BaseComponent {
  constructor(props) {
    super(props);

    this.markEventAs = this.markEventAs.bind(this);
  }

  markEventAs(confirmation) {
    markEventConfirmation.call({
      postId: this.props.post._id,
      confirmation: confirmation
    }, (err) => {
      if (err) {
        displayError(err);
      } else {
        toastr.success('Action has been confirmed', 'Success');
      }
    });
    console.log(confirmation);
  }

  render() {
    const { post } = this.props;
    const event = post.event;

    return (
      <div className="event-details">
        <hr/>
        <div className="layout">
          <div className="map flex">
            <Locator address={event.location}/>
          </div>
          <div className="info flex-none">
            <p className="location">
              <i className="glyphicon glyphicon-map-marker"></i>
              {event.location}
            </p>
            <p className="date">
              <i className="glyphicon glyphicon-time"></i>
              {event.time.toLocaleString()}
            </p>

            <p>Mark myself as:</p>
            <div className="btn-group">
              <button type="button"
                      className="btn btn-success"
                      onClick={() => this.markEventAs('going')}>
                Going
              </button>
              <button type="button"
                      className="btn btn-info"
                      onClick={() => this.markEventAs('maybe')}>
                Maybe
              </button>
              <button type="button"
                      className="btn btn-danger"
                      onClick={() => this.markEventAs('notGoing')}>
                Not going
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  post: React.PropTypes.object
};
