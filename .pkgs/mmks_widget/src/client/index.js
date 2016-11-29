import utils from '../utils';
import initAuthorizations from './configs/authInit';
import methodStubs from './configs/method_stubs';
import actions from './actions';
import routes from './routes';

/* eslint-disable no-console */
function init( _utils ) {

  console.log('MMKS Widget :: dist/client/index.js');
  console.log(_utils);
  utils.Logger = _utils.Logger;
  utils.LayoutDefault = _utils.LayoutDefault;
  utils.AccessControlComposer = _utils.AccessControlComposer;
  utils.Authorized = _utils.Authorized;

  console.log('MMKS Widget :: dist/client/index.js ¨¨¨¨¨¨¨');
  return {
    routes,
    actions,
    load(context) {
      methodStubs(context);
      initAuthorizations(context);
    }
  };

}
/* eslint-enable no-console */

const Client = {
  new: init,
};

export default Client;

export const Utils = utils;



// export default {
//   routes,
//   actions,
//   load(context) {
//     methodStubs(context);
//     initAuthorizations(context);
//   }
// };
