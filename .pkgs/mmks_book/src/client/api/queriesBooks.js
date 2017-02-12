import gql from 'graphql-tag';

export const LOAD_BOOK_QUERY = gql`
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

