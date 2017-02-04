import React from 'react';

import Sidebar from '../containers/sidebar';

// import AcCont from '/client/access_control/acContainer.js';
import Utils from '../../utils';

import Composer from '../composers/add';
import Component from '../components/uniform';

let Container = function dummy() { return <div></div>; };
let Authorized = function dummy() { return <div></div>; };

export default class extends React.Component {

  constructor(props) {
    super(props);
    Container = Composer(Component);
    Authorized = Utils.Authorized;
  }

  render() {

    const apAdd = {module: 'books', action: 'add'};
    const accPnts = [ apAdd ];

/*
            <Authorized accesspoints={accPnts} warn='true'>
              <Container />
            </Authorized>
*/
    return (
      <div className="bs-docs-section clearfix">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Container />
          </div>
        </div>
      </div>
    );

  }
}
