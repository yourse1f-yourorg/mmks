import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

export const addComposer = ({context, clearErrors}, onData) => {

  const {LocalState} = context();
  const exception = LocalState.get('_books.ADD_ERROR');

  onData(null, { exception } );

};

export const depsMapper = (context, actions) => ({
  submitAction: actions._books.add,
  clearErrors: actions._books.clearErrors,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(addComposer),
    useDeps(depsMapper)
  )(component);
