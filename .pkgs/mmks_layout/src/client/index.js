import utils from '../utils';
import initAuthorizations from './configs/authInit';

import actions from './actions';


function init( _utils ) {

  utils.Logger = _utils.Logger;
  utils.Context = _utils.Context;
  utils.UserComposer = _utils.UserComposer;
  utils.AccessControlComposer = _utils.AccessControlComposer;
  utils.Authorized = _utils.Authorized;

  actions._layout.initialize();

  return {

    actions,
    load(context) {
      initAuthorizations(context);
    }
  };

}

const Client = {
  new: init,
};

export default Client;

export const Utils = utils;
