/* eslint-disable no-console   */
function init( _context) {
  let { Meteor } = _context;

  return function () {
    Meteor.methods({
      '_books.wipe'() {
        console.log('<|> <|> (mmks_books/src/server/methods=>_books.wipe) <|> <|> ');
        return true;
      }
    });
  };
}

const Methods = {
  new: init,
};

export default Methods;
