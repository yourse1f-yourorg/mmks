exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('author', function(table) {
      table.increments('_id').primary();
      table.string('firstName');
      table.string('lastName');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('book', function(table){
      table.increments('_id').primary();
      table.string('title');
      table.text('content');
      table.integer('views');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
      table.integer('authorId')
      table.foreign('authorId').references('_id').inTable('author');
    })

  ])
};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.dropTable('book'),
    knex.schema.dropTable('author')
  ])

};
