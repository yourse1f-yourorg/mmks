import React from 'react';
import { ApolloProvider } from 'react-apollo';

import composer from '../composers/Layout';
import Component from '../components/Layout';
const Container = composer(Component);

import Utils from '../../utils';

export default class extends React.Component {

  render() {

    // console.log(" Props : ", this.props);
    // console.log("Utils.Context.ApolloClient ", Utils.Context.ApolloClient);

    return (

      <ApolloProvider client={ Utils.Context.ApolloClient }>
        <div>
          <div className="container">
              <Container { ...this.props }/>
          </div>
        </div>
      </ApolloProvider>

    );
  }
}
