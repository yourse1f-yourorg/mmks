const typeDefinitions = `

  type Author {
    _id: Int
    firstName: String
    lastName: String
    books: [Book]
    deleted: Boolean
    deletedAt: Int
  }

  type Book {
    _id: Int
    title: String
    content: String
    pages: Int
    author: Author
    deleted: Boolean
    deletedAt: Int
  }

  type Query {
    book(_id: Int, title: String): [Book]
    author(_id: Int, firstName: String, lastName: String): [Author]
  }

  type Mutations {

    createAuthor(
      firstName: String
      lastName: String!
    ): Author

    createBook(
      title: String!
      content: String!
      pages: Int!
      authorId: Int
    ): Book

    updateBook(
      _id: Int!
      title: String!
      content: String!
      pages: Int!
      authorId: Int
    ): Book

    hideBook(
      _id: Int!
      deleted: Boolean
      deletedAt: Int
    ): Book
  }

  schema {
    query: Query,
    mutation: Mutations
  }

`;

export default [ typeDefinitions ];
