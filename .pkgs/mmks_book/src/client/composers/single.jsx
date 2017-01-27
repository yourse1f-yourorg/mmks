import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

export const singleComposer = ({context, _id, accesspoints, clearErrors}, onData) => {

  const {Meteor, Collections, LocalState} = context();
  const error = LocalState.get('_books.DELETE_ERROR');
  if (Meteor.subscribe('_books.single', _id).ready()) {
    const record = Collections.Books.findOne(_id);
    if (record) {
      onData(null, {record, error});
    }
  }
};

export const depsMapper = (context, actions) => ({
  hideAction: actions._books.hide,
  deleteAction: actions._books.delete,
  clearErrors: actions._books.clearErrors,
  context: () => context
});

export default (component, _authComposer) => composeAll(
    composeWithTracker(_authComposer),
    composeWithTracker(singleComposer),
    useDeps(depsMapper)
  )(component);
