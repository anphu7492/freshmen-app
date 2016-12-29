import React from 'react';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import MobileMenu from '../components/MobileMenu.jsx';
import Message from '../components/Message.jsx';

class NotFoundPage extends BaseComponent {
  render() {
    return (
      <div className="page not-found">
        <nav>
          <MobileMenu />
        </nav>
        <Message title={i18n.__('pages.notFoundPage.pageNotFound')} customClass="absolute"/>
      </div>
    );
  }
}

export default NotFoundPage;
