/* eslint-disable no-console   */
function init( _clsBooks, _dbBooks, _context) {
  let { AccessControl, App, Meteor, check, _lgr } = _context;

  const Lgr = new _lgr( __filename, 'warn' );

  const module = 'books';

  return function () {
    Meteor.methods({

      '_books.add'(data, _id) {
        Lgr.a = '_books.add';
        const action = 'add';
        const ap = AccessControl.findAccessPoint( module, action, App.group );

        const authorized = Roles.userIsInRole(
          Meteor.userId(),
          ap.trusted,
          ap.group
        );

        Lgr.debug( 'User, ' + Meteor.userId() + ', wants to add a book.');
        if ( authorized ) {
          check(data, {
            title: String,
            pages: Number,
            content: String
          });
          check(_id, String);

          let book = new _clsBooks();
          book._id = _id;

          book.title = data.title;
          book.content = data.content;
          book.pages = data.pages;

          book.createAt = new Date();

          Lgr.verbose(`\nSaving : ${JSON.stringify(book)} \n`);
          book.save();

          return;
        }

        Lgr.warn(`Unauthorized attempt to add a book by user : ${Meteor.userId()}\n`);
        throw new Meteor.Error(
          ' UNAUTHORIZED ACCESS ATTEMPT',
          'You are not authorized for that action',
          'endpoint: server/methods/_book.js');
      },

      '_books.update'(data, _id) {
        Lgr.a = '_books.update';
        const action = 'add';
        check(data, {
          title: String,
          pages: Number,
          content: String
        });
        check(_id, String);

        const ap = AccessControl.findAccessPoint( module, action, App.group );
        const authorized = Roles.userIsInRole(
          Meteor.userId(),
          ap.trusted,
          ap.group
        );

        if ( authorized ) {
          let record = _clsBooks.findOne(_id);
          record.fullText();

          const allowedFields = [ 'title', 'pages', 'content' ];
          for (let key of allowedFields) {
            record[key] = data[key];
          }

          if ( record.content.includes('crap')) {
            throw new Meteor.Error(
              ' Remedy : cut the crap ',
              'I knew it! You\'re to blame -- again!',
              'Yup. When it\'s cwappy, it\'s wee wee, wee wee cwappy');
          }
          Lgr.verbose(`\nSaving : ${JSON.stringify(record)} \n`);
          record.save(allowedFields);

          return;
        }

        Lgr.verbose(`Unauthorized attempt to edit book by user : ${Meteor.userId()}\n`);
        throw new Meteor.Error(
          ' UNAUTHORIZED ACCESS ATTEMPT',
          'You are not authorized for that action',
          'endpoint: server/methods/_book.js');

      },

      '_books.delete'(_id) {
        check(_id, String);
        Lgr.a = '_books.delete';

        Lgr.info(`\nDeleting : ${JSON.stringify(record)}\n`);

        let record = _clsBooks.findOne(_id);
        record.remove();
      },

      '_books.hide'(_id) {
        check(_id, String);
        Lgr.a = '_books.hide';

        let record = _clsBooks.findOne(_id);
        record.softRemove();

        Lgr.info(`\nHidden : ${JSON.stringify(record)}\n`);

      },

      '_books.wipe'() {
        let result = _dbBooks.remove({});
        return result;
      }
    });
  };
}

const Methods = {
  new: init,
};

export default Methods;
