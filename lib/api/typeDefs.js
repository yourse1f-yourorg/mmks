import { schema as bookSchema } from './book';
import { schema as authorSchema } from './author';
import { schema as partnerSchema } from './partner';

const mergeTypes = (ary, type, note) => {
  return ary.reduce(
    (A, V) => {
      return A.endsWith(note) ?
      A + `  type ${type} {\n      ${V}\n  }\n\n` :
      A + `  extend type ${type} {\n    ${V}\n  }\n\n`;
    }
    , note
  );
};

var mut = [];
var qry = [];
[ bookSchema, authorSchema, partnerSchema ]
  .forEach(function (schema) {
    mut = mut.concat(schema.mut);
    qry = qry.concat(schema.qry);
  }
);
const mutations = mergeTypes(
    mut, 'Mutations', '  ## Accumulated Mutations ## \n'
);
const queries = mergeTypes(
    qry, 'Queries', '  ## Accumulated Queries ## \n'
);

const typeDefs = '  ## Accumulated Queries ## \n' +
  bookSchema.typ +
  authorSchema.typ
;

const schema = `
  schema {
    query: Queries,
    mutation: Mutations
  }

`;

export default [
  typeDefs + mutations + queries + schema
];
