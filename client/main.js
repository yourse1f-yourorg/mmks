import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import commentsModule from './modules/comments';

import _usersModule from './modules/_users';
import _colorsModule from './modules/_colors';
//import _widgetsModule from './modules/_widgets';

import _layoutModule from './modules/layout';

import Logger from '/lib/logging/client/clientLogger';
import { LayoutDefault } from './configs/theme.jsx';
import AccessControlComposer from './access_control/acComposer';
import Authorized from './access_control/acContainer.js';

import { Client as _widget } from 'mmks_widget';


/* eslint-disable no-console   */
// init context
const context = initContext();


// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.loadModule(_usersModule);
app.loadModule(_colorsModule);
app.loadModule(_layoutModule);

console.log('MMKS :: client/main.js ----- Make new Widget');
let PLUGIN = true;
// PLUGIN = false;
if ( PLUGIN ) {
  let Widget = _widget.new({
    Logger,
    LayoutDefault,
    AccessControlComposer,
    Authorized
  });
  app.loadModule(Widget);
  console.log('MMKS :: ... made a plugin widget ...');
} else {
  app.loadModule(_widgetsModule);
  console.log('MMKS :: ... made a builtin widget ...');
}
console.log('.........................');

app.init();
