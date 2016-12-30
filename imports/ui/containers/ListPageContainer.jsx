import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Lists } from '../../api/lists/lists.js';
import ListPage from '../pages/ListPage.jsx';
import { Session } from 'meteor/session';

const ListPageContainer = createContainer(({ params: { id } }) => {
  const todosHandle = Meteor.subscribe('todos.inList', { listId: id });
  const loading = !todosHandle.ready();
  const list = Lists.findOne(id);
  const listExists = !loading && !!list;
  Session.set('menuOpen', false);
  Session.set('rightMenuOpen', false);

  return {
    loading,
    list,
    listExists,
    todos: listExists ? list.todos().fetch() : [],
  };
}, ListPage);

export default ListPageContainer;
