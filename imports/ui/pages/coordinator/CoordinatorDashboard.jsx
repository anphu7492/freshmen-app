import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import Message from '../../components/Message.jsx';

export default class CoordinatorDashboard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {});
  }

  render() {
    const { loading, groups } = this.props;
    console.log(groups);
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        groups: groups
      })
    );
    return (
      <div className="dashboard">
        {loading
          ? <Message title="Loading" />
          : childrenWithProps}
      </div>
    )
  }
}

CoordinatorDashboard.propTypes = {
  loading: React.PropTypes.bool,
  groups: React.PropTypes.array
};