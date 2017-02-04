import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const bookMutation = gql`
  mutation createBook( $title: String! $content: String! $pages: Int! $authorId: Int! )
  {
    createBook( title: $title, content: $content, pages: $pages authorId: $authorId )
    {
      _id title content pages
    }
  }`;

export const addComposer = ({context, clearErrors}, onData) => {

  const {LocalState} = context();
  const exception = LocalState.get('_books.ADD_ERROR');

  onData(null, { exception } );

};

export const depsMapper = (context, actions) => ({
  submitAction: actions._books.create,
  clearErrors: actions._books.clearErrors,
  context: () => context
});

const Component = (component) => composeAll(
    graphql(bookMutation),
    composeWithTracker(addComposer),
    useDeps(depsMapper)
  )(component);

export default Component;
