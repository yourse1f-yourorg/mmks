import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

export const singleComposer = ({context, _id, accesspoints, clearErrors}, onData) => {

//  const {Meteor, Collections, LocalState} = context();
  const {ApolloClient, GQL, LocalState} = context();
  const error = LocalState.get('_books.DELETE_ERROR');

  console.log('Composing book data : ', _id);

  const aBookQuery = GQL`
    query aBookQuery ($idBook: Int!) {
      book(_id: $idBook)
      {
        _id
        title
        content
        pages
        author {
          _id
          firstName
          lastName
        }
      }
    }`;

/* ***************************************
             View A Book Composer
   ***************************************/

/* eslint-disable no-console */
  ApolloClient.query({
    query: aBookQuery,
    variables: {idBook: _id},
    forceFetch: false,
  }).then((graphQLResult) => {
    const { errors, data } = graphQLResult;

    if (data) {
      let record = data.book[0];
      onData(null, {record, error});
    }
    if (errors) {
      console.log('got some GraphQL execution errors', errors);
    }
  }).catch((error) => {
    console.log('There was an error sending the query', error);
  });
/* eslint-enable no-console */

  // if (Meteor.subscribe('_books.single', _id).ready()) {
  //   const record = Collections.Books.findOne(_id);
  //   if (record) {
  //     onData(null, {record, error});
  //   }
  // }

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
