import React from 'react';
import {mount} from 'react-mounter';

import {
  LayoutDefault,
  // Simple
} from '../../configs/theme.jsx';

import WidgetsList from './containers/collection.jsx';
import WidgetsView from './containers/single.jsx';
import WidgetsAdd from './containers/add.jsx';
import WidgetsEdit from './containers/edit.jsx';

export default function (injectDeps, {FlowRouter}) {

  const LayoutDefaultCtx = injectDeps(LayoutDefault);

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
      mount(LayoutDefaultCtx, {
        content: () => (<WidgetsAdd />)
      });
    }
  });

  FlowRouter.route('/widgets/:_id', {
    name: '_widgets.widgetsView',
    action({_id}) {
      mount(LayoutDefaultCtx, {
        content: () => (<WidgetsView _id={_id}/>)
      });
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
