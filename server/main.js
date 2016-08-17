import publications from './publications';
import methods from './methods';
import addInitialUsers from './configs/initial_users.js';
import { initPosts, initAccessPoints } from './configs/initial_adds.js';

Meteor.startup(function () {

/* eslint-disable no-console   */
  const msg = '**** [Build and Deploy : Successful] :: ' +
              'Meteor Mantra Kickstarter is starting now . . . ';
  if ( process.env.LOGGLY_TOKEN &&
       process.env.LOGGLY_TOKEN.length &&
       process.env.LOGGLY_TOKEN.length === 36 ) {
    console.log(msg);
    return;
  }

  if ( Meteor.settings.LOGGLY_TOKEN &&
       Meteor.settings.LOGGLY_TOKEN.length &&
       Meteor.settings.LOGGLY_TOKEN.length === 36 ) {
    console.log(msg);
    return;
  }

  console.log('\n\n **STOPPED **\n' +
    '     Please ensure that your execution environment or the file, "settings.json", ' +
                             'has a valid Loggly authentication token named LOGGLY_TOKEN.\n' +
    '     either use `export LOGGLY_TOKEN=""` in the environment, or make a copy of ' +
                 '"settings.json.example", and correct the provided configuration fields.\n' +
    '     Then you can restart Meteor with the command : `meteor --settings=settings.json`\n');
/* eslint-enable console   */
  process.exit();

});

publications();
methods();
initPosts();
initAccessPoints();
addInitialUsers();
