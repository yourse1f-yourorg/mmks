module.exports = {

  continuousIntegration: {
    client: 'sqlite3',
    connection: {
      filename: '../../../.meteor/local/.db.sqlite'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      port: 5432,
      host: 'pgdb',
      database: 'apollo',
      user: 'apollo',
      password: 'okmmpl,,',
    }
  }

};
