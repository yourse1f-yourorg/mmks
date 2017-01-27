import { Author, Book } from './db-connectors';

const resolvers = {
  Query: {
    book(_, args) {
      let res = Book.findAll({ where: args });
      return res;
    },
    author(_, args) {
      let res = Author.findAll();
      return res;
    },
  },

  Author: {
    books(author) {
      return author.getBooks();
    },
  },

  Book: {
    author(book) {
      return book.getAuthor();
    },
  },

};

export default resolvers;
