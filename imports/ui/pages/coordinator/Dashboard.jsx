import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';

export default class CoordinatorDashboard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {});
  }

  render() {
    return (
      <div className="dashboard">
        {this.props.children}
      </div>
    )
  }
}