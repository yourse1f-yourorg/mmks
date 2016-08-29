import { MobileBundles } from '../../lib/collections';
import { Meteor } from 'meteor/meteor';

import FS from 'fs-extra';

var getBaseDirectoryOfMobileBundles = ( path ) => {
  let aryPath = path.split('/');
  let lenPath = aryPath.length;
  return aryPath.slice(0, lenPath - 2).join('/');
};

/* eslint-disable no-undef   */
// console.log('Location of private assets' + Assets.absoluteFilePath('dummy') );
/* eslint-enable no-undef   */

const baseDirMobileBundles = '../web.browser/app/mobile';
let bundlesInFileSystem = {};

function getBundlesListFromFileSystem() {

  let fsBundles = {};

  try {
/* eslint-disable no-sync   */
    FS.accessSync(baseDirMobileBundles, FS.F_OK);
    FS.walk( baseDirMobileBundles )
/* eslint-enable no-sync   */
      .on('readable', function () {
        var item;
        while ((item = this.read())) {
          if ( item.stats.isFile() ) {

  //          console.log('Item path is :: ' + item.path);

            let base = getBaseDirectoryOfMobileBundles( item.path );
  //          console.log('Base path is :: ' + base);

            /* Get the file and directory's names */
            var dirFile = item.path.split('/').slice(-2);
            var dir = dirFile[0];

            /* Start a JSON record for the directory */
            if ( !fsBundles[dir] ) { fsBundles[dir] = {}; }

            /* Get the filename regardless of whether we found the file or it's descriptor */
            var pair = dirFile[1];
            var file = pair;
            if ( pair.substr(pair.length - 4) === '.txt' ) {
              file = pair.substr(0, pair.length - 4);
            }

            /* Make the JSON record for the file */
            if ( !fsBundles[dir][file] ) {
              let pthTitleFile = base + '/' + dir + '/' + file + '.txt';
  //            console.log('Try to read :: ' + pthTitleFile);
              /* eslint-disable no-sync */
              var title = FS.readFileSync(pthTitleFile);
              /* eslint-enable no-sync */
  //            console.log('File : ' + file + ' Title : ' + title);
              fsBundles[dir][file] = { dir, file, title: ' ' + title };
            }


          }
        }
      })
      .on('end', function () {
        bundlesInFileSystem = fsBundles;
      });


  } catch (e) {
    bundlesInFileSystem = {};
  }

}

let POLL_INTERVAL = 60000 * 5;

export default function () {

//  console.log( 'Start publishing bundles' );
  Meteor.publish('mobile.bundles', function () {

    const poll = () => {

      let quickRef = [];

      getBundlesListFromFileSystem();
      MobileBundles.remove({});

      for ( var bundle in bundlesInFileSystem) {
        if ( bundle ) {
//          console.log( 'Load bundle : ' + bundle );
          for ( var file in bundlesInFileSystem[bundle] ) {
            if ( file ) {
              let jsonBundle = bundlesInFileSystem[bundle][file];
//              console.log( 'Load file : ' + file);
//              console.log( jsonBundle );
              quickRef.push(jsonBundle.dir + file);

              MobileBundles.upsert(file,
                {
                  $set: {
                    file,
                    dir: jsonBundle.dir,
                    title: jsonBundle.title
                  }
                }
              );

            }
          }
        }
      }

      let bundlesInDatabase = MobileBundles.find();
      bundlesInDatabase.forEach( function (item) {
//        console.log( 'Bundles in database : ', item.dir + item.file);
        let drop = true;
        for ( let aFile in quickRef ) {
          if ( quickRef[aFile] === item.dir + item.file ) {
//            console.log( 'got a file : ' + quickRef[aFile]);
            drop = false;
          }
        }
        if ( drop ) {
//          console.log( 'dropping : ' + item.dir + item.file );
          MobileBundles.remove({ dir: item.dir, file: item.file });
        }
      });

    };

    poll();
    this.ready();

    const interval = Meteor.setInterval(poll, POLL_INTERVAL);

    this.onStop(() => {
      Meteor.clearInterval(interval);
    });

    return MobileBundles.find();

  });

}
