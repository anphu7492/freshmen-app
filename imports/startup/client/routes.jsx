import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import i18n from 'meteor/universe:i18n';
import { Meteor } from 'meteor/meteor';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import ListPageContainer from '../../ui/containers/ListPageContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import TutorDashboard from '../../ui/pages/TutorDashboard.jsx';
import StudentDashboard from '../../ui/pages/StudentDashboard.jsx';
import AddGroupPage from '../../ui/pages/coordinator/AddGroupPage.jsx';
import AddStudentPage from '../../ui/pages/coordinator/AddStudentPage.jsx';
import CoordinatorPageContainer from '../../ui/containers/CoordinatorPageContainer.jsx';
import TutorPageContainer from '../../ui/containers/TutorPageContainer.jsx';
import ProfilePage from '../../ui/pages/ProfilePage.jsx';
import About from '../../ui/pages/About.jsx';
import Faq from '../../ui/pages/Faq.jsx';
import ContactUs from '../../ui/pages/ContactUs.jsx';
i18n.setLocale('en');

function requireAuth(nextState, replace) {
  if (!Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/login" component={AuthPageSignIn} />
    <Route path="/join" component={AuthPageJoin} />
    <Route path="/" component={AppContainer} onEnter={requireAuth}>
      <Route path="/about" component={About} />
      <Route path="/faq" component={Faq} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="tutor" component={TutorPageContainer} />
      <Route path="lists/:id" component={ListPageContainer} />
      <Route path="student" component={StudentDashboard} />
      <Route path="/profile/:id" component={ProfilePage}/>
      <Route path="coordinator" component={CoordinatorPageContainer}>
        <Route path="add-group" component={AddGroupPage}/>
        <Route path="add-student" component={AddStudentPage}/>

      </Route>
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Router>
);
