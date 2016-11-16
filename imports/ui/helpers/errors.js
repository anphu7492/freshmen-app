/* global alert */

import i18n from 'meteor/universe:i18n';

export const displayError = (error) => {
  if (error) {
    // It would be better to not alert the error here but inform the user in some
    // more subtle way
    console.log(error);
    toastr.error(error.reason || error.message, error.error); // eslint-disable-line no-alert
  }
};
