/*
*/
exports.seed = function(knex, Promise) {
  return Promise.join(

    knex('book').del(),
    knex('author').del(),

    //  Generated from https://www.mockaroo.com/schemas/53829
    knex('author').insert({"_id":1,"firstName":"Naéva","lastName":"Gardner"}),
    knex('author').insert({"_id":2,"firstName":"Torbjörn","lastName":"Vasquez"}),
    knex('author').insert({"_id":3,"firstName":"Bérengère","lastName":"Thomas"}),
    knex('author').insert({"_id":4,"firstName":"Méghane","lastName":"Long"}),
    knex('author').insert({"_id":5,"firstName":"Maïté","lastName":"Burns"}),
    knex('author').insert({"_id":6,"firstName":"Eugénie","lastName":"Chapman"}),
    knex('author').insert({"_id":7,"firstName":"Mélys","lastName":"Rice"}),
    knex('author').insert({"_id":8,"firstName":"Athéna","lastName":"Nelson"}),
    knex('author').insert({"_id":9,"firstName":"Anaël","lastName":"Watkins"}),
    knex('author').insert({"_id":10,"firstName":"Mahélie","lastName":"Lee"})

  );
};
