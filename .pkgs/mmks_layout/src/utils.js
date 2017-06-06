// import React from 'react';

/* eslint-disable no-unused-vars, no-console */
class Logger {
  constructor( f ) {
    this.f = f;
  }

  log() {
    console.log('MMKS Layout :: /utils.js \n Dummy logger replace at runtime.');
  }
}

const Context = { ApolloClient: null };

function UserComposer(_ref, onData) {
  let ref = _ref;
}

function AccessControlComposer(_ref, onData) {
  let ref = _ref;
}

function Authorized(props, context, updater) {
  let properties = props;
}

// console.log('mmks/utils -- UserComposer', UserComposer);

let Utils = { Logger, Context, UserComposer, AccessControlComposer, Authorized };

export default Utils;
/* eslint-enable no-unused-vars, no-console */
