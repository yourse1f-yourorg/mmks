import { Utils } from '../index';

let Lgr = null;

export default {

  initialize() {
    Lgr = new Utils.Logger( __filename, 'warn' );
    Lgr.a = 'getLogger';
  },

  log() {
    Lgr.a = 'getLogger';
    Lgr.error(' Testing!  ');
    return 'Logger initialized in child';
  },

  // create
  create({Meteor, LocalState, FlowRouter}, book, mutate) {
    Lgr.a = 'create';
    Lgr.info('Create book with :: ', book.title);
    console.log('Book.create.  With : ', book);        // eslint-disable-line no-console
    mutate({
      variables: {
        title: book.title,
        content: book.content,
        pages: book.pages,
        authorId: book.author
      }
    }).then(function (result) {
      FlowRouter.go('/book/' + result.data.createBook._id);
    });
  },

  // update
  update({Meteor, LocalState, FlowRouter}, book, _id, mutate) {
    Lgr.a = 'update';
    console.log('Update book (data) : ', book);        // eslint-disable-line no-console
    console.log('Update book (_id) : ', book._id);        // eslint-disable-line no-console
    mutate({
      variables: {
        id: book._id,
        title: book.title,
        content: book.content,
        pages: book.pages,
        authorId: book.author._id
      }
    }).then(function (result) {
      const { errors, data } = result;
      console.log('Update book result :: ', data); // eslint-disable-line no-console
      console.log('Update book errors :: ', errors); // eslint-disable-line no-console
      FlowRouter.go('/book/' + result.data.updateBook._id);
    }).catch((error) => {
      console.log('Book update error :: ', error); // eslint-disable-line no-console
    });
  },

  hide({Meteor, LocalState, FlowRouter}, _id) {
    Lgr.a = 'hide';
    Meteor.call('_books.hide', _id, (err) => {
      if (err) {
        return LocalState.set('_books.HIDE_ERROR', err.message);
      }
      FlowRouter.go('/books/');

    });
  },

  // clearError
  clearErrors({LocalState}) {
    Lgr.a = 'clearErrors';
    Lgr.debug('clearing now');
    LocalState.set('_books.DELETE_ERROR', null);
    LocalState.set('_books.HIDE_ERROR', null);
    LocalState.set('_books.ADD_ERROR', null);
    LocalState.set('_books.UPDATE_ERROR', null);
    return;
  }

};
