import Sequelize from 'sequelize';

console.log(' Sanity Check -- Can we see settings?'); // eslint-disable-line no-console
console.log(' Is "LOGGLY_SUBDOMAIN" = "yourwork" --> ', Meteor.settings.LOGGLY_SUBDOMAIN ); // eslint-disable-line no-console

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
    'postgres',
    'hab',
    'memorablecacaphony',
    {
      host: 'localhost',
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
