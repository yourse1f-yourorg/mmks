import { Author, Book } from './db-connectors';

const resolvers = {
  Query: {
    book(_, args) {
      let res = Book.findAll({ where: args });
      return res;
    },
    author(_, args) {
      let res = Author.findAll({ where: args });
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

  Mutations: {

    createAuthor: (_, args) => {
      console.log("Creating an Author ?", args);
      return Author.create(
        { firstName: args.firstName, lastName: args.lastName }
      ).then ( (sequelizeResult) => {
//        console.log('After mutation ', sequelizeResult);
        const { errors, dataValues } = sequelizeResult;
        if (dataValues) {
          console.log('got some GraphQL results', dataValues);
          return dataValues;
        }
        if (errors) {
          console.log('got some GraphQL execution errors', errors);
        }
      }).catch ( (error) => {
        console.log('There was an error sending the query', error);
      });
    },

    createBook: (_, args) => {
      console.log("Creating a Book :: ", args);
      console.log("... having Author :: ", args.authorId);
      let aBook = Book.build(
      {
        title: args.title,
        content: args.content,
        pages: args.pages,
        authorId: args.authorId
      });

      console.log("An Author looks like : ", Author);

      return aBook.save().then (
        (sequelizeResult) => {
//        console.log('After mutation ', sequelizeResult);
        const { errors, dataValues } = sequelizeResult;
        if (dataValues) {
          console.log('got some GraphQL results', dataValues);
          return dataValues;
        }
        if (errors) {
          console.log('got some GraphQL execution errors', errors);
        }
      }).catch ( (error) => {
        console.log('There was an error sending the query', error);
      });
    },

  },

};

export default resolvers;
