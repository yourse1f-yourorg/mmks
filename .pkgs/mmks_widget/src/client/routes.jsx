import React from 'react';
import {mount} from 'react-mounter';

import Utils from '../utils';

import WidgetsList from './containers/collection.js';
import WidgetsView from './containers/single.js';
import WidgetsAdd from './containers/add.js';
import WidgetsEdit from './containers/edit.js';

export default function (injectDeps, {FlowRouter}) {

  const LayoutDefaultCtx = injectDeps(Utils.LayoutDefault);

  FlowRouter.route('/widgets', {
    name: '_widgets.widgetsList',
    action() {
      mount(LayoutDefaultCtx, {
        content: () => (<WidgetsList />)
      });
    }
  });

  FlowRouter.route('/widgets/add', {
    name: '_widgets.widgetsAdd',
    action() {
      console.log('........ widget/routes ....I...');
      console.log( LayoutDefaultCtx );
      console.log('................................');
      console.log( WidgetsAdd );
      mount(LayoutDefaultCtx, {
        content: () => (<WidgetsAdd />)
      });
      console.log('........ widget/routes ....O....');
    }
  });

  FlowRouter.route('/widgets/:_id', {
    name: '_widgets.widgetsView',
    action({_id}) {
      console.log('........ widget/routes ....I...');
      console.log( LayoutDefaultCtx );
      console.log('................................');
      console.log( WidgetsView );
      mount(LayoutDefaultCtx, {
        content: () => (<WidgetsView _id={_id}/>)
      });
      console.log('........ widget/routes ....O....');
    }
  });

  FlowRouter.route('/widgets/:_id/edit', {
    name: '_widgets.widgetsEdit',
    action({_id}) {
      mount(LayoutDefaultCtx, {
        content: () => (<WidgetsEdit _id={_id}/>)
      });
    }
  });

}
