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
    Lgr.info("Create book with :: ", book.title);
    console.log("Book.create.  With : ", book);
    mutate({
      variables: {
        title : book.title,
        content: book.content,
        pages: book.pages,
        authorId: book.author
      }
    }).then(function(result) {
      FlowRouter.go('/book/' + result.data.createBook._id);
    });
  },

  // // add
  // add({Meteor, LocalState, FlowRouter}, data) {
  //   Lgr.a = 'add';
  //   const _id = Meteor.uuid();
  //   Meteor.call('_books.add', data, _id, (err) => {
  //     if (err) {
  //       Lgr.error(err.message);
  //       LocalState.set('_books.ADD_ERROR', err.message);
  //       return;
  //     }
  //     FlowRouter.go('/book/' + _id);
  //   });
  // },

  // update
  update({Meteor, LocalState, FlowRouter}, data, _id) {
    Lgr.a = 'update';
    console.log("Update book : ", data);
    // Meteor.call('_books.update', data, _id, (err) => {
    //   if (err) {
    //     Lgr.error(err.message);
    //     LocalState.set('_books.UPDATE_ERROR', err.message);
    //     return;
    //   }
    //   FlowRouter.go('/books/' + _id);
    // });
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
