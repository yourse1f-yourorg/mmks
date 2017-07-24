import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

// export const singleComposer = ({context}, onData) => {
//   onData(null, { } );

// };

/* ***************************************
             NavLeftContent Composer
   ***************************************/

export default (component, _authComposer) => composeAll(
  composeWithTracker(_authComposer),
  // composeWithTracker(singleComposer),
  useDeps()
)(component);
