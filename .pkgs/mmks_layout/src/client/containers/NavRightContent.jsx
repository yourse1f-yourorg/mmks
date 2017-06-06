import React from 'react';

import { Utils } from '../index';
import _UserControls from './UserControls';

let UserControls = null;

export default class extends React.Component {

  render() {

    UserControls = Utils.UserComposer(_UserControls);

    // console.log('mmks_layout NavRight -- UserControls', UserControls);

    return (
      <UserControls
        classVersion="navbar-nav"
        />
    );
  }
}
