import React from 'react';

import Sidebar from '../containers/sidebar.js';

import { Authorized } from '../index';
// import Authorized from '/client/access_control/acContainer.js';

import dataComposer from '../composers/add.js';
import Component from '../components/_form.js';

const Container = dataComposer(Component);
console.log('......... client/container/add .............');
console.log(Component);
console.log('.....................................');

export default class extends React.Component {

  render() {

    console.log('......... client/container/add .............');
    console.log(Container);
    console.log('.................>  <....................');
    const apAdd = {module: 'widgets', action: 'add'};
    const accPnts = [ apAdd ];
//    console.log(' ad cont - -   apAdd : ', apAdd);

    return (
      <div className="bs-docs-section clearfix">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Authorized accesspoints={accPnts} warn='true'>
              <Container />
            </Authorized>
          </div>
        </div>
      </div>
    );

  }
}

/*
            <Authorized accesspoints={accPnts} warn='true'>
              <Container />
            </Authorized>
*/
