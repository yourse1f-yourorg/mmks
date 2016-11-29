import posts from './posts';
import _users from './_users';
import _colors from './_colors';
// import _widgets from './_widgets';

import { Methods as mthdsWidget } from 'mmks_widget';

import { Widgets, _Widgets, AccessControl } from '../../lib/collections';

import App from '/lib/app';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import _lgr from '/lib/logging/server/serverLogger';

const ctx = { AccessControl, App, Meteor, check, _lgr };

// console.log('........ Methods .........');
// console.log(mthdsWidget);
let _widgets = mthdsWidget.new(Widgets, _Widgets, ctx);
// console.log('-------- Methods ----------');

export default function () {
  posts();
  _users();
  _colors();
  _widgets();
}
