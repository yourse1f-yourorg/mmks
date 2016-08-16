module.exports = {
  servers: {
    one: {
      host: '${HOST_SERVER_NAME}',
      username: '${HOST_USER_NAME}'
    }
  },

  meteor: {
    name: '${REPO_PROJECT_NAME}',
    path: '../../${REPO_PROJECT_NAME}',
    servers: {
      one: {}
    },

    buildOptions: {
      serverOnly: false,
      cleanAfterBuild: true,
      debug: true
    },

    env: {
      PORT: 80,
      ROOT_URL: 'http://${HOST_SERVER_NAME}',
      MONGO_URL: 'mongodb://localhost:27017/${REPO_PROJECT_NAME}',
      LOGGLY_TOKEN: '78472f82-5dc9-4537-bee8-9399c1b5d82e',
      MAILGUN_KEY: 'key-a853f54d456d70ff0f8ccb8b2b250f92',
      VARS_TEST_VAR: '${CIRCLE_PROJECT_USERNAME}'

    },

    ssl: {
      crt: './bundle.crt', // this is a bundle of certificates
      key: './private.key', // this is the private key of the certificate
      port: 443, // 443 is the default value and it's the standard HTTPS port
      upload: false
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
