import Sequelize from 'sequelize';
// import Migrator from './knex_migrator';

export const db = new Sequelize(
  'apollo',
  'apollo',
  'okmmpl,,',
  {
    host: 'pgdb',
    dialect: 'postgres'
  }
);

const AuthorModel = db.define('author', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
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
  views: { type: Sequelize.STRING },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

AuthorModel.hasMany(BookModel, { as: 'books' });
BookModel.belongsTo(AuthorModel, { as: 'author' });
// AuthorModel.hasMany(BookModel, { foreignKey: 'authorId', as: 'books' });
// BookModel.belongsTo(AuthorModel, { foreignKey: 'authorId', as: 'author' });


const Author = db.models.author;
const Book = db.models.book;

console.log("Book <<< ");
let book = Book.findAll();
book.then(function(result){ console.log("-------------------------", result[0]); });
// book.then(function(result){ console.log("-------------------------", result[1]._id, result[1].title, result[1].author); });

console.log("Book >>> ");

export { Author, Book };
