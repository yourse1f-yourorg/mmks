import React from 'react';

import dataComposer from '../composers/bundles.js';
import Component from './_list.jsx';

const Container = dataComposer(Component);

export default class extends React.Component {

  render() {
    return (
      <div className="bs-docs-section clearfix">
          <div className="row">

              <div className="col-md-3">
                  <h2 className="font-bold">Welcome</h2>

                  <p>
                    If you're viewing this page in a mobile browser you can choose instead to
                    install it as an app. Pick one of these links to load the appropriate
                    application bundle into your device.
                  </p>

              </div>
              <div className="col-md-9">
                  <div className="ibox-content">

                    <h2>Mobile Application Bundles</h2>
                    <p>
                        Click a link to download an installer for your device.
                    </p>

                    <Container />

                  </div>
              </div>
          </div>
          <hr/>
      </div>

    );
  }
}
