import React from 'react';
import {mount} from 'react-mounter';

import {
  LayoutDefault,
//  Simple
} from '../../configs/theme.jsx';


import Mobile from './components/mobile/wrapper.jsx';

export default function (injectDeps, {FlowRouter}) {

  const LayoutDefaultCtx = injectDeps(LayoutDefault);

  FlowRouter.route('/mobile', {
    name: 'layout.mobile',
    action() {
      mount(LayoutDefaultCtx, {
        content: () => (<Mobile/>)
      });
    }
  });

}
