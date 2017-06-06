import React from 'react';

import composer from '../composers/NavLeftContent';
import Component from '../components/NavLeftContent';

import Utils from '../../utils';

let Container = function dummy() { return <div></div>; };

export default class extends React.Component {

  constructor(props) {
    super(props);
    Container = composer(Component, Utils.AccessControlComposer);
  }


/* ***************************************
             NavLeftContent Container
   ***************************************/

  render() {

    const apAddPosts = {module: 'posts', action: 'add'};
    const apAddColors = {module: 'colors', action: 'add'};
    const apAddWidgets = {module: 'widgets', action: 'add'};
    const apAddBooks = {module: 'books', action: 'add'};

    const accPnts = [ apAddPosts, apAddColors, apAddWidgets, apAddBooks ];

    return (
      <Container accesspoints={accPnts}/>
    );
  }
}
