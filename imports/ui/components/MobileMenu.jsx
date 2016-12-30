import React from 'react';
// XXX: no session!
import { Session } from 'meteor/session';
import i18n from 'meteor/universe:i18n';
import BaseComponent from './BaseComponent.jsx';

class MobileMenu extends BaseComponent {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleRightMenu = this.toggleRightMenu.bind(this);
  }

  toggleMenu() {
    Session.set('menuOpen', !Session.get('menuOpen'));
  }

  toggleRightMenu() {
    Session.set('rightMenuOpen', !Session.get('rightMenuOpen'));
  }

  render() {
    return (
      <div className="nav-group mobile-menu ">
        <div className="layout-align--middle">
          <a href="#toggle-menu" className="nav-item flex-none" onClick={this.toggleMenu}>
            <i className="glyphicon glyphicon-align-justify"></i>
          </a>
          <div className="flex">
            <a href="/">Freshmen Guide</a>
          </div>
          <a href="#toggle-right-menu" className="nav-item flex-none" onClick={this.toggleRightMenu}>
            <i className="glyphicon glyphicon-stats"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default MobileMenu;
