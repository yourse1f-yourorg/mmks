import React from 'react';

import Composer from '../composers/booklist';
import Component from '../components/booklist';
const Container = Composer(Component);

export default class extends React.Component {

  render() {

    return (

      <div className="bs-docs-section clearfix">
        <Container />
      </div>
    );

  }

}
