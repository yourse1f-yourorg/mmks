const typeDefinitions = `

  type Author {
    _id: Int
    firstName: String
    lastName: String
    books: [Book]
  }

  type Book {
    _id: Int
    title: String
    content: String
    views: Int
    author: Author
  }

  type Query {
    book(_id: Int): [Book]
    author(_id: Int, firstName: String, lastName: String): [Author]
  }

  type RootMutation {
    createAuthor(
      firstName: String!
      lastName: String!
    ): Author
    createBook(
      tags: [String!]!
      title: String!
      content: String!
      authorIdentification: Int!
    ): Book
  }

  schema {
    query: Query,
    mutation: RootMutation
  }

`;

export default [ typeDefinitions ];

/*

type Author {
  _id: Int
  firstName: String
  lastName: String
  posts: [Book]
}
type Book {
  _id: Int
  title: String
  content: String
  views: Int
  author: Author
}
type Query {
  author(firstName: String, lastName: String): Author
}
type RootMutation {
  createAuthor(
    firstName: String!
    lastName: String!
  ): Author
  createBook(
    tags: [String!]!
    title: String!
    content: String!
    authorId: Int!
  ): Book
}
schema {
  query: Query,
  mutation: RootMutation
}
*/
