import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import commentsModule from './modules/comments';

import _usersModule from './modules/_users';
import _colorsModule from './modules/_colors';
import _widgetsModule from './modules/_widgets';

import _layoutModule from './modules/layout';

import { Client as Widget } from 'mmks_widget';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.loadModule(_usersModule);
app.loadModule(_colorsModule);
app.loadModule(_widgetsModule);
app.loadModule(_layoutModule);
app.loadModule(Widget);

app.init();
