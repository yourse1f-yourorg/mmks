import React from 'react';
import { Utils } from '../index';

let Lgr = null;

export default class extends React.Component {

  constructor(props) {
    super(props);
    Lgr = new Utils.Logger(__filename, 'warn', true);
  }

  hideRecord() {
    this.props.hideAction(this.props._id);
  }

  render() {
    Lgr.a = 'render ';

    const { _id, record, permissions } = this.props;

    const enableBooksUpdate = permissions['books:update'];
    const enableBooksDelete = permissions['books:delete'];


    Lgr.verbose(`enableBooksAdd permitted? : ${enableBooksUpdate}`);
    Lgr.verbose(`enableBooksDelete permitted? : ${enableBooksDelete}`);

    let editAllowed = `btn btn-large ${enableBooksUpdate ? 'enabled' : 'disabled'}`;
    let deleteAllowed = `btn btn-large ${enableBooksDelete ? 'enabled' : 'disabled'}`;

    return (
      <div>
        {record.saving ? <p>Saving...</p> : null}
        <h2><x-cuke id="title">{record.title}</x-cuke></h2>
        <p>
          <x-cuke id="pages">
            {record.pages} {record.pages === 1 ? 'page' : 'pages'}.
          </x-cuke>
        </p>
        <p>
          <x-cuke id="content">{record.content}</x-cuke>
          <br />
          <a data-cuke='edit-item' href={'/books/' + _id + '/edit'}
                                                        className={ editAllowed }>
            edit
          </a>
          &nbsp;|&nbsp;
          <a data-cuke='delete-item' href="#" onClick={this.hideRecord.bind(this)}
                                                        className={ deleteAllowed }>
            delete
          </a>
        </p>
      </div>
    );

  }
}
