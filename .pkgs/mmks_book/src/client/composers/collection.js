import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

const apoComposer = ({context}, onData) => {

  const {ApolloClient, GQL} = context();

  const MyQuery = GQL`query MyQuery {
      book
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
             BookList Composer
   ***************************************/

/* eslint-disable no-console */
  ApolloClient.query({
    query: MyQuery,
    forceFetch: false,
  }).then((graphQLResult) => {
    const { errors, data } = graphQLResult;

    if (data) {
      let book = data.book;
      console.log('BookList: All', data.book);
      console.log('Book 1: ', data.book[0]._id, data.book[0].title);
      onData(null, {book});
    }
    if (errors) {
      console.log('got some GraphQL execution errors', errors);
    }
  }).catch((error) => {
    console.log('there was an error sending the query', error);
  });
/* eslint-enable no-console */

};

const composedComponent = (component) => composeAll(
  composeWithTracker(apoComposer),
  useDeps()
)(component);

export default composedComponent;
