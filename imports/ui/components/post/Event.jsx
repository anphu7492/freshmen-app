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
  }

  render() {
    const { post } = this.props;
    const event = post.event;
    const stats = {
      going: event.confirmations.filter(conf => (conf.status === 'going')),
      notGoing: event.confirmations.filter(conf => (conf.status === 'notGoing')),
      maybe: event.confirmations.filter(conf => (conf.status === 'maybe')),
    };
    const myStatus = event.confirmations.find(conf => (conf.user === Meteor.userId())) || {};
    console.log(stats, myStatus);

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

            <div className="stats">
              <div>{stats.going.length} Going</div>
              <div>{stats.maybe.length} Interested</div>
              <div>{stats.notGoing.length} Not going</div>
            </div>
            <p>Mark myself as:</p>
            <div className="btn-group">
              <button type="button"
                      disabled={myStatus.status === 'going'}
                      className={`btn btn-success ${myStatus.status === 'going' ? 'checked' : ''}`}
                      onClick={() => this.markEventAs('going')}>
                {myStatus.status === 'going' ? <i className="glyphicon glyphicon-ok"></i> : ''}
                Going
              </button>
              <button type="button"
                      disabled={myStatus.status === 'maybe'}
                      className={`btn btn-info ${myStatus.status === 'maybe' ? 'checked' : ''}`}
                      onClick={() => this.markEventAs('maybe')}>
                {myStatus.status === 'maybe' ? <i className="glyphicon glyphicon-ok"></i> : ''}
                Maybe
              </button>
              <button type="button"
                      disabled={myStatus.status === 'notGoing'}
                      className={`btn btn-danger ${myStatus.status === 'notGoing' ? 'checked' : ''}`}
                      onClick={() => this.markEventAs('notGoing')}>
                {myStatus.status === 'notGoing' ? <i className="glyphicon glyphicon-ok"></i> : ''}
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
