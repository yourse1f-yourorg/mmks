import React from 'react';

export default class extends React.Component {

  render() {

    const {bundles} = this.props;
    let cnt = bundles.count();

    return (
      <div>
        { cnt > 0 ?
          <ul data-cuke="bundles-list">
            {bundles.map(bundle => (
              <li key={bundle.file}>
                <a data-cuke={bundle.file}
                    target="_blank"
                    href={`/mobile/${bundle.dir}/${bundle.file}`}>
                      {bundle.title} : <i>{bundle.file}</i>
                </a>
              </li>
            ))}
          </ul> :
          <p> <i>  So far, none are available. Sorry. </i> </p>
        }
      </div>
    );
  }
}


/*
render(<div id={condition ? 'msg' : null}>Hello World!</div>, mountNode);
const BundleList = ({bundles}) => (
  <div>
    <ul data-cuke="bundles-list">
      {bundles.map(bundle => (
        <li key={bundle.file}>
          <a data-cuke={bundle.file}
              target="_blank"
              href={`/mobile/${bundle.dir}/${bundle.file}`}>
                {bundle.title} : <i>{bundle.file}</i>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default BundleList;
*/
