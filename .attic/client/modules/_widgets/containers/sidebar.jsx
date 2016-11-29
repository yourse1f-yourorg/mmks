import React from 'react';

import dataComposer from '../composers/sidebar.jsx';
import Component from '../components/_sidebar.jsx';

import authComposer from '/client/access_control/acComposer';

// let Container = class extends React.Component { render() { return ( <div></div> ); } };
let Container = function dummy() { return <div></div>; };

export default class extends React.Component {

  constructor(props) {
    super(props);
    console.log('......... containers/sidebar ........');
    console.log(authComposer);
    console.log('.....................................');
    Container = dataComposer(Component, authComposer);
  }

  render() {

    const apAddWidgets = {module: 'widgets', action: 'add'};
    const accPnts = [ apAddWidgets ];

    return (
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">Widgets navigation</h3>
        </div>
        <div className="box-body no-padding">
            <Container accesspoints={accPnts}/>
        </div>
      </div>
    );
  }
}
