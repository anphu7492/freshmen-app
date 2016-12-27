import React from 'react';
import { Link } from 'react-router';
import i18n from 'meteor/universe:i18n';
import BaseComponent from './BaseComponent.jsx';

export default class UserMenu extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { open: false });
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.stopPropagation();
    this.setState({
      open: !this.state.open,
    });
  }

  renderLoggedIn() {
    const { open } = this.state;
    const { user, logout } = this.props;
    const email = user.emails[0].address;
    const emailLocalPart = email.substring(0, email.indexOf('@'));
 const profileLink = "/profile/" + user._id;
    return (
      <div className="user-menu vertical">
        <a href="#toggle" className="custom-btn-secondary" onClick={this.toggle}>
          {open
            ? <span className="icon-arrow-up" />
            : <span className="icon-arrow-down" />}
          {user.profile.name}
        </a>
        {open
          ? <a className="custom-btn-secondary" href={profileLink}>
            Profile
          </a>
          : null}
        {open
          ? <a className="custom-btn-secondary" onClick={logout}>
            {i18n.__('components.userMenu.logout')}
          </a>
          : null}
      </div>
    );
  }

  renderLoggedOut() {
    return (
      <div className="user-menu">
        <Link to="/signin" className="custom-btn-secondary">
          {i18n.__('components.userMenu.login')}
        </Link>
        <Link to="/join" className="custom-btn-secondary">
          {i18n.__('components.userMenu.join')}
        </Link>
      </div>
    );
  }

  render() {
    return this.props.user
      ? this.renderLoggedIn()
      : this.renderLoggedOut();
  }
}

UserMenu.propTypes = {
  user: React.PropTypes.object,
  logout: React.PropTypes.func,
};
