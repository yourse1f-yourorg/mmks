module.exports = {
  servers: {
    one: {
      host: 'yourhost.yourpublic.work',
      username: 'mup'
    }
  },

  meteor: {
    // name: 'meteor-mantra-kickstarter',
    // path: '../../meteor-mantra-kickstarter',
    name: 'mmks',
    path: '../mmks',
    servers: {
      one: {}
    },

    buildOptions: {
      serverOnly: false,
      debug: true
    },

    env: {
      PORT: 80,
      ROOT_URL: 'http://yourhost.yourpublic.work',
      // MONGO_URL: 'mongodb://localhost:27017/meteor-mantra-kickstarter'
      MONGO_URL: 'mongodb://localhost:27017/mmks',
      LOGGLY_TOKEN: '78472f82-5dc9-4537-bee8-9399c1b5d82e',
      MAILGUN_KEY: 'key-a853f54d456d70ff0f8ccb8b2b250f92'


    },

    ssl: {
      crt: './bundle.crt', // this is a bundle of certificates
      key: './private.key', // this is the private key of the certificate
      port: 443 // 443 is the default value and it's the standard HTTPS port
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 75,
    enableUploadProgressBar: true
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
