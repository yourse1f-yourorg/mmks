/*
*/
exports.seed = function (knex, Promise) {
  return Promise.join(

    knex('book').del(),
    knex('author').del(),

    //  Generated from https://www.mockaroo.com/schemas/53829
    knex('author').insert({firstName: 'Naéva',lastName: 'Gardner'}),
    knex('author').insert({firstName: 'Torbjörn',lastName: 'Vasquez'}),
    knex('author').insert({firstName: 'Bérengère',lastName: 'Thomas'}),
    knex('author').insert({firstName: 'Méghane',lastName: 'Long'}),
    knex('author').insert({firstName: 'Larry',lastName: 'Niven'}),
    knex('author').insert({firstName: 'Eugénie',lastName: 'Chapman'}),
    knex('author').insert({firstName: 'Mélys',lastName: 'Rice'}),
    knex('author').insert({firstName: 'Athéna',lastName: 'Nelson'}),
    knex('author').insert({firstName: 'Anaël',lastName: 'Watkins'}),
    knex('author').insert({firstName: 'Mahélie',lastName: 'Lee'})

  );
};
