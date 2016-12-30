import React from 'react';
import Datetime from 'react-datetime';
import { Random } from 'meteor/random';
import BaseComponent from '../BaseComponent.jsx';
import update from 'immutability-helper';
import Textarea from 'react-textarea-autosize';
import { displayError } from '../../helpers/errors.js';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { insert } from '../../../api/posts/methods.js';
import Geosuggest from 'react-geosuggest';

/**
 * css file must be import in js file,
 * if we want to import a css file to another stylesheet, change the extension to .less
 */
import 'react-datetime/css/react-datetime.css';

export default class PostCreate extends BaseComponent {
  constructor(props) {
    super(props);
    this.user = Meteor.user();
    this.members = Meteor.users.find({group: this.user.group, role: 'student'}).fetch();
    this.initState();

    this.onPostCreate = this.onPostCreate.bind(this);
    this.onCreateTask = this.onCreateTask.bind(this);
    this.onCreateEvent = this.onCreateEvent.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.onRemoveTask = this.onRemoveTask.bind(this);
    this.onRemoveTaskItem = this.onRemoveTaskItem.bind(this);
    this.onEventDateChange = this.onEventDateChange.bind(this);
    this.onRemoveEvent = this.onRemoveEvent.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onAssignTask = this.onAssignTask.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  onSuggestSelect(suggest){
    let post = this.state.post;
    post.event.location.type = 'latLong';
    post.event.location.address = suggest.label;
    post.event.location.lat = suggest.location.lat;
    post.event.location.long = suggest.location.lng;
    this.setState({ post : post });
  }

  initState() {
    this.state = Object.assign(this.state, {
      post: {
        text: '',
        type: 'simple'
      },
      errors: {},
      placeholder: `Hey ${this.user.profile.name}, what's going on?`
    });

  }

  onPostCreate(event) {
    event.preventDefault();
    const { post } = this.state;

    if (!post.text) {
      toastr.error('Post content is required', 'Error');
      return;
    }

    let newPost = {
      type: post.type,
      text: post.text
    };

    if (post.type === 'event') {

      if (!post.event.time || this.state.errors.invalidEventDate) {
        toastr.error('Please select a valid date', 'Error');
        return;
      }
      newPost.event = {
        location: post.event.location,
        time: post.event.time.toDate()
      };

    } else if (post.type == 'task') {
      newPost.task = {
        todos: post.task.todos.map(todo => ({
          _id: todo._id,
          text: todo.text.value
        })),
        assignees: this.members.filter(member => member.checked)
        .map(selected => ({
          user: selected._id,
          status: 'ongoing'
        }))
      }
    }

    insert.call({
      type: newPost.type,
      text: newPost.text,
      event: newPost.event ? newPost.event : null,
      task: newPost.task ? newPost.task : null
    }, (err, res) => {
      if (err && newPost.event) {
        toastr.error("Please choose appropriate location from suggestions and time from the calendar");
      } else if(err){
        return displayError(err);
      } else {
        this.members.forEach((member) => (member.checked = false));
        toastr.success('Post has been created', 'Awesome');
        this.initState();
      }
    });

    // this.props.callBack(newPost)
  }

  onCreateTask() {
    if (this.state.post.type === 'task') {
      return;
    }
    let { post } = this.state;

    post.type = 'task';
    post.event = null;
    post.task = {
      todos: [
        {_id: Random.id(), text: 'Enter a task'}
      ],
      assignees: [{}]
    };

    this.setState({
      post: post,
      placeholder: "Write some lines about the task"
    });
  }

  onAddTask() {
    if (this.state.post.type !== 'task') {
      return;
    }

    const { post } = this.state;
    post.task.todos.push({_id: Random.id(), text: ''});

    this.setState({
      post: post
    });
  }

  onTextChange(e) {
    this.setState({
      post: update(this.state.post, {
        text: {$set: e.target.value}
      })
    });
  }

  onRemoveTask() {
    if (this.state.post.type !== 'task') {
      return;
    }

    this.setState({
      post: update(this.state.post, {
        type: {$set: 'simple'},
        task: {$set: null}
      }),
      placeholder: `Hey ${this.user.profile.name}, what's going on?`
    });
  }

  onRemoveTaskItem(index) {
    if (this.state.post.type !== 'task') {
      return;
    }

    this.setState({
      post: update(this.state.post, {
        task: {todos: {$splice: [[index,1]]}}
      })
    });
  }

  onAssignTask(member) {
    member.checked = !member.checked;
  }

  onCreateEvent() {
    if (this.state.post.type === 'event') {
      return;
    }

    this.setState({
      post: update(this.state.post, {
        type: {$set: 'event'},
        task: {$set: null},
        event: {$set: {
          location: {},
          time: null
        }}

      }),
      placeholder: "What is the event about?"

    });
  }

  onRemoveEvent() {
    if (this.state.post.type !== 'event') {
      return;
    }

    this.setState({
      post: update(this.state.post, {
        type: {$set: 'simple'},
        event: {$set: null}
      }),
      placeholder: `Hey ${this.user.profile.name}, what's going on?`
    });
  }
  onEventDateChange(date) {
    if (typeof date === 'string' || !date.isValid()) {
      this.setState({
        errors: update(this.state.errors, {
          invalidEventDate: {$set: true}
        })
      });
      return;
    }
    this.state.post.event.time = date;
    this.setState({
      errors: update(this.state.errors, {
        invalidEventDate: {$set: false}
      })
    });
  }

  renderTasksBox() {
    const { post } = this.state;

    let items = post.task.todos.map((todo, index) => {
      return (
        <div key={todo._id} className="row">
          <div className="col-sm-10">
            <input type="text"
                   className="form-control"
                   ref={(c) => {todo.text = c}}
                   placeholder="Enter a task"/>
          </div>
          {index > 0
            ? <i className="icon-close"
                 onClick={() => this.onRemoveTaskItem(index)}></i>
            : null}
        </div>
      );
    });

    let memberList = this.members.map(member => (
      <div key={member._id} className="item layout-align--midle">
        <label className="checkbox flex-none" htmlFor={member._id}>
          {/*cannot assign value to member.checked because it controls it's own state
          ** https://facebook.github.io/react/docs/forms.html#controlled-components
          */}
          <input
            id={member._id}
            type="checkbox"
            checked={member.selected}
            name="checked"
            onChange={() => this.onAssignTask(member)}
          />
          <span className="checkbox-custom" />
        </label>
        <div className="name flex">{member.profile.name}</div>
      </div>
    ));
    return (
      <div className="post-task">
        {items}
        <div className="add-btn"
                type="button"
                onClick={this.onAddTask}>
          <i className="glyphicon glyphicon-plus"></i> Add todo
        </div>

        <div className="assignee-list">
          <p>Assign task:</p>
          {memberList}
        </div>
      </div>
    )
  }

  renderEventBox() {
    const { post } = this.state;
    const yesterday = Datetime.moment().subtract(1, 'day');
    const valid = function( current ){
      return current.isAfter( yesterday );
    };

    return (
      <div className="post-event">
        {/*<input placeholder="Where?" className="location form-control"
               type="text"
               ref={(c) => { post.event ? post.event.location = c : null}}/>*/}
       <Geosuggest
              placeholder="Where?"
              className="Geosuggest"
              onSuggestSelect={this.onSuggestSelect}
              location={new google.maps.LatLng(0,0)}
              autoActivateFirstSuggest={true}
              radius="20" />

            <Datetime inputProps={{ placeholder: ('When?')}} isValidDate={ valid }
                  timeConstraints={{minutes: {step: 15}}}
                  dateFormat="DD/MM/YYYY"
                  onChange={this.onEventDateChange} />
      </div>
    )
  }

  render() {
    const { post } = this.state;

    let taskBtn = (
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="add-task">Add a task</Tooltip>}>
        <button className="custom-btn-primary" type="button" onClick={this.onCreateTask}>
          <i className="glyphicon glyphicon-align-left"></i>
        </button>
      </OverlayTrigger>
    );
    if (post.type === 'task') {
      taskBtn = (
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="add-task">Remove this task</Tooltip>}>
          <button className="custom-btn-danger" type="button" onClick={this.onRemoveTask}>
            <i className="glyphicon glyphicon-remove-circle"></i>
          </button>
        </OverlayTrigger>
      )
    }
    let eventBtn = (
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="add-task">Add an event</Tooltip>}>
        <button className="custom-btn-primary" type="button" onClick={this.onCreateEvent}>
          <i className="glyphicon glyphicon-map-marker"></i>
        </button>
      </OverlayTrigger>
    );
    if (post.type === 'event') {
      eventBtn = (
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="add-task">Remove this event</Tooltip>}>
          <button className="custom-btn-danger" type="button" onClick={this.onRemoveEvent}>
            <i className="glyphicon glyphicon-remove-circle"></i>
          </button>
        </OverlayTrigger>
      )
    }

    return (
      <div className="post-box">
        <form className="post-create" onSubmit={this.onPostCreate}>
          <Textarea
            name="text"
            minRows={3}
            maxRows={20}
            className="text form-control"
            value={this.state.post.text}
            onChange={this.onTextChange}
            placeholder = {this.state.placeholder}>
          </Textarea>
          {post.type === 'task' ?
            this.renderTasksBox() :
            post.type === 'event' ? this.renderEventBox() : ''}
          <div className="post-types layout">
            <div className="flex">
              {this.user.role === 'tutor' && taskBtn}
              {eventBtn}

            </div>
            <div className="flex-none">
              <button className="custom-btn-success submit" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

PostCreate.propTypes = {
  callback: React.PropTypes.func
};
