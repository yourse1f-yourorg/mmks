import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

export const collectionComposer = ({context}, onData) => {

  const accessPoint = {module: 'books', action: 'add'};

  const {Meteor, Collections} = context();
  if (Meteor.subscribe('_books.list').ready()) {
    const collection = Collections.Books.find();
    onData(null, {collection, accessPoint});
  }
};

export default (component) => composeAll(
    composeWithTracker(collectionComposer),
    useDeps()
  )(component);
