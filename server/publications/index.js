import posts from './posts';
import mobile from './mobile';
import _users from './_users';
import _colors from './_colors';
import _roles from './_roles';
import accessControl from './access_control';

export default function () {
  posts();
  mobile();
  _users();
  _colors();
  _roles();
  accessControl();
}
