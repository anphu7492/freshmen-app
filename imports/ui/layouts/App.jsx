import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import { Lists } from '../../api/lists/lists.js';
import UserMenu from '../components/UserMenu.jsx';
import ListList from '../components/ListList.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';
import Profiles from '../components/Profiles.jsx';
import { Link } from 'react-router';
import { Modal } from 'react-bootstrap';
import TutorSidebar from '../components/TutorSidebar.jsx';
import StudentSidebar from '../components/StudentSidebar.jsx';
const CONNECTION_ISSUE_TIMEOUT = 5000;
import AddGroupPage from '../pages/coordinator/AddGroupPage.jsx';
import AddStudentPage from '../pages/coordinator/AddStudentPage.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showConnectionIssue: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
    this.state.showAddStudents = false;
    this.state.showAddGroups = false;
    this.openAddStudents = this.openAddStudents.bind(this);
    this.closeAddStudents = this.closeAddStudents.bind(this);
    this.openAddGroups = this.openAddGroups.bind(this);
    this.closeAddGroups = this.closeAddGroups.bind(this);
  }

  closeAddStudents() {
   this.setState({ showAddStudents: false });
 }

 openAddStudents() {
   this.setState({ showAddStudents: true });
 }

 closeAddGroups() {
  this.setState({ showAddGroups: false });
}

openAddGroups() {
  this.setState({ showAddGroups: true });
}

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  componentWillReceiveProps({ loading, children }) {
    // redirect / to a list once lists are ready
    /*if (!loading && !children) {
      const list = Lists.findOne();
      this.context.router.replace(`/lists/${list._id}`);
    }*/
    if (!loading && !children) {
      if (Meteor.user().role === 'tutor') {
        this.context.router.replace('/tutor');
      } else if (Meteor.user().role === 'coordinator') {
        this.context.router.replace('/coordinator');
      } else if (Meteor.user().role === 'student') {
        this.context.router.replace('/student');
      }
    }
  }

  toggleMenu(menuOpen = !Session.get('menuOpen')) {
    Session.set({ menuOpen });
  }

  logout() {
    Meteor.logout();

    //redirect to login page
    this.context.router.push('/login');
  }

  render() {
    const { showConnectionIssue } = this.state;
    const {
      user,
      connected,
      loading,
      lists,
      menuOpen,
      children,
      location,
      users,
      groups,
      tasks
    } = this.props;

    // eslint-disable-next-line react/jsx-no-bind
    const closeMenu = this.toggleMenu.bind(this, false);

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    const coordinatorMenu = (
      <li>
        <Link onClick={this.openAddStudents}>Add students</Link>
        <Link onClick={this.openAddGroups}>Add groups</Link>
      </li>
    );

    return (
      <div>
        <div className="navibar">
          <div className="container-fluid">
              <ul className="navibar-nav">
                <li><a className="site-title" href="/">Freshmen Guide</a></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/contact-us">Contact US</Link></li>
                {!loading && user.role === 'coordinator' ? coordinatorMenu : ''}

              </ul>
          </div>
        </div>


      <div id="container" className={menuOpen ? 'menu-open' : ''}>
        <section id="menu">
          {/*<LanguageToggle />*/}
          <UserMenu user={user} logout={this.logout} />
          {!loading ?
            <Profiles user={user}/>
            : ''}
          <ListList lists={lists}/>
        </section>
        {showConnectionIssue && !connected
          ? <ConnectionNotification />
          : null}
        <div className="content-overlay" onClick={closeMenu} />
        <div id="content-container">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            {loading
              ? <Loading key="loading" />
              : clonedChildren}

              <Modal  show={this.state.showAddStudents} onHide={this.closeAddStudents}>
              <Modal.Header dialogClassName="custom-modal" closeButton>
                <Modal.Title>Add Students</Modal.Title>
              </Modal.Header>
              <Modal.Body dialogClassName="custom-modal">
                  <AddStudentPage groups={groups}/>
              </Modal.Body>
              <Modal.Footer dialogClassName="custom-modal">
                <button className="btn btn-danger" onClick={this.closeAddStudents}>Cancel</button>
              </Modal.Footer>
            </Modal>

            <Modal dialogClassName="custom-modal" show={this.state.showAddGroups} onHide={this.closeAddGroups}>
            <Modal.Header closeButton>
              <Modal.Title>Add Groups</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddGroupPage/>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-danger" onClick={this.closeAddGroups}>Cancel</button>
            </Modal.Footer>
          </Modal>

          </ReactCSSTransitionGroup>

        </div>
        <div id="right-sidebar">
          {user && (user.role === 'tutor' && !loading)
            ? <TutorSidebar user={user} group={user.group} users={users} groups={groups} tasks={tasks}/>
            : ''
          }
          {user && user.role === 'student' && !loading
            ? <StudentSidebar user={user} group={user.group} users={users} groups={groups}/>
            : ''
          }
        </div>
      </div>

      </div>

    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  lists: React.PropTypes.array,      // all lists visible to the current user
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
  groups: React.PropTypes.array,
  posts: React.PropTypes.array
};

App.contextTypes = {
  router: React.PropTypes.object,
};
