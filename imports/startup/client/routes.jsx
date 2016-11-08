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
      <Route path="tutor" component={TutorDashboard} />
      <Route path="lists/:id" component={ListPageContainer} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Router>
);
