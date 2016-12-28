import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import PostCreate from '../../components/post-create/PostCreate.jsx';
import PostList from '../../components/post-list/PostList.jsx';
import Loading from '../../components/Loading.jsx';

export default class CoordinatorDashboard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {});
  }

  render() {
    const { loading, groups, posts } = this.props;

    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        groups: groups
      })
    );
    return (
      <div className="dashboard">
        <div className="flex-none">
          <PostCreate callBack={this.update}></PostCreate>
        </div>
        <div className="flex">
          {loading
            ? <Loading key="loading" />
            : <PostList posts={posts} loading={false}/>
          }
        </div>
        {/*{loading*/}
          {/*? <Message title="Loading" />*/}
          {/*: childrenWithProps}*/}
      </div>
    )
  }
}

CoordinatorDashboard.propTypes = {
  loading: React.PropTypes.bool,
  groups: React.PropTypes.array
};
