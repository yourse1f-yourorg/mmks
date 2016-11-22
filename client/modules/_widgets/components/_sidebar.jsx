import React from 'react';

import _lgr from '/lib/logging/client/clientLogger.js';
const Lgr = new _lgr(__filename, 'info', true);

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    Lgr.a = 'render ';

    // console.log( ' side bar component : permissions ', this.props.permissions );

    const enableWidgetsAdd = this.props.permissions['widgets:add'];

    Lgr.verbose(`enableWidgetsAdd permitted? : ${enableWidgetsAdd}`);

    let hrefAddWidget = '/widgets';
    let classAddWidget = 'disabled';
    if ( enableWidgetsAdd ) {
      hrefAddWidget = '/widgets/add';
      classAddWidget = 'enabled';
    }

    return (
      <ul className="nav nav-pills nav-stacked">
        <li><a href="/widgets"><i className="fa "></i> Widgets collection</a></li>
        <li className={classAddWidget}>
          <a href={hrefAddWidget}>
            <i className="fa "></i> Add widget
          </a>
        </li>
      </ul>
    );
  }
}

/*

        <li key={Math.random()} className={addEnabled}>
*/

