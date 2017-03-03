import Sequelize from 'sequelize';

/* eslint-disable no-console */
console.log(' Sanity Check -- Can we see settings?');
console.log(' PG  DB --> ', Meteor.settings.PG_DB );
console.log(' PG UID --> ', Meteor.settings.PG_UID );
console.log(' PG PWD --> ', Meteor.settings.PG_PWD );
console.log(' PG HST --> ', Meteor.settings.PG_HST );
/* eslint-enable no-console */

let sequelize = null;
if ( Meteor.isProduction ) {

  console.log(' Meteor mode -- "Production" using PostgreSQL'); // eslint-disable-line no-console

/* var sequelize = new Sequelize('database', 'username', 'password', {options})  */
  // sequelize = new Sequelize(
  //   'apollo',
  //   'apollo',
  //   'okmmpl,,',
    // {
    //   host: 'pgdb',
    //   dialect: 'postgres'
    // }

  sequelize = new Sequelize(
    Meteor.settings.PG_DB,
    Meteor.settings.PG_UID,
    Meteor.settings.PG_PWD,
    {
      host: Meteor.settings.PG_HST,
      dialect: 'postgres'
    }
  );

} else {
  console.log(' Meteor mode -- NOT "Production"; using SQLite'); // eslint-disable-line no-console
  sequelize = new Sequelize('mmks', null, null, {
    dialect: 'sqlite',
    storage: '/tmp/db/mmks.sqlite'
  });
}

export const db = sequelize;

const AuthorModel = db.define('author', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  deleted: { type: Sequelize.BOOLEAN },
  deletedAt: { type: Sequelize.DATE },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

const BookModel = db.define('book', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  title: { type: Sequelize.STRING },
  content: { type: Sequelize.STRING },
  pages: { type: Sequelize.STRING },
  deleted: { type: Sequelize.BOOLEAN },
  deletedAt: { type: Sequelize.DATE },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

AuthorModel.hasMany(BookModel, { as: 'books' });
BookModel.belongsTo(AuthorModel, { as: 'author' });

const Author = db.models.author;

const Book = db.models.book;

let book = Book.findAll();
book.then(function (result) {
  console.log(' We got the first book -- ', result[0].title); // eslint-disable-line no-console
}).catch( (error) => {
  console.log('Sequelize error while finding books...', error); // eslint-disable-line no-console
});

export { Author, Book };
