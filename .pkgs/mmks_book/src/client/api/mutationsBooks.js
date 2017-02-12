import gql from 'graphql-tag';

export const CREATE_BOOK_MUTATION = gql`
  mutation createBook( $title: String! $content: String! $pages: Int! $authorId: Int! )
  {
    createBook( title: $title, content: $content, pages: $pages authorId: $authorId )
    {
      _id title content pages
    }
  }`;

export const UPDATE_BOOK_MUTATION = gql`
  mutation bookUpdate( $id: Int! $title: String! $content: String! $pages: Int! $authorId: Int! )
  {
    updateBook( _id: $id, title: $title, content: $content, pages: $pages authorId: $authorId )
    {
      _id title content pages author{ _id, lastName, firstName }
    }
  }`;
