import React from 'react';

import Sidebar from '../containers/sidebar.js';

import { Authorized } from '../index';
// import Authorized from '/client/access_control/acContainer.js';

import dataComposer from '../composers/edit.js';
import Component from '../components/_form.js';
const Container = dataComposer(Component);

export default class extends React.Component {

  render() {

    const apEdit = {module: 'widgets', action: 'update'};
    const accPnts = [ apEdit ];

    const {_id} = this.props;
    return (
      <div className="bs-docs-section clearfix">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Authorized accesspoints={accPnts} warn='true'>
              <Container _id={_id}/>
            </Authorized>
          </div>
        </div>
      </div>
    );

  }
}

/*
            <Authorized accesspoint='widgets.update' warn='true'>
              <Container _id={_id}/>
            </Authorized>
*/
