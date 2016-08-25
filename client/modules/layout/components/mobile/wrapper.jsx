import React from 'react';

export default class extends React.Component {

  render() {
    return (
      <div className="bs-docs-section clearfix">
          <div className="row">

              <div className="col-md-6">
                  <h2 className="font-bold">Welcome</h2>

                  <p>
                    If you're viewing this page in a mobile browser you can choose instead to
                    install it as an app. Pick one of these links to load the appropriate
                    application bundle into your device.
                  </p>


              </div>
              <div className="col-md-6">
                  <div className="ibox-content">

                    <h3>Mobile Application Bundles</h3>




                  </div>
              </div>
          </div>
          <hr/>
      </div>

    );
  }
}
