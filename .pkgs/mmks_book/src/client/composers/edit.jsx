import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

import {singleComposer} from './single.js';

export const editComposer = ({context, clearErrors}, onData) => {

  const {LocalState} = context();
  const exception = LocalState.get('_books.UPDATE_ERROR');

  onData(null, {exception});
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._books.update,
  clearErrors: actions._books.clearErrors,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(singleComposer),
    composeWithTracker(editComposer),
    useDeps(depsMapper)
  )(component);
