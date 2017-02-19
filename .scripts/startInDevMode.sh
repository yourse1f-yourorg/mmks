#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};

echo PROJECT_ROOT=${PROJECT_ROOT};
${PROJECT_ROOT}/.scripts/free.sh;
#
rm -rf ${PROJECT_ROOT}/.meteor/local;
#
#
# export HOST_SERVER_NAME="http://moon.planet.sun:3000/";
# export ROOT_URL="${HOST_SERVER_NAME}";
# export YOUR_FULLNAME="You Yourself";
# export GITHUB_ORGANIZATION_NAME="YourOrg";
#
cd ${PROJECT_ROOT};
# meteor npm run knex_cont;
#

export KEYSTORE_PWD="obscuregobbledygook";
export HOST_SERVER_PORT=3000;
export HOST_SERVER_URL="3bbb529d.ngrok.io";
export HOST_SERVER_NAME="http://${HOST_SERVER_URL}:${HOST_SERVER_PORT}/";

export ROOT_PORT=80;
export ROOT_URL="http://${HOST_SERVER_URL}:${ROOT_PORT}/"
export YOUR_FULLNAME="You Yourself";
export GITHUB_ORGANIZATION_NAME="YourOrg";

echo "Mobile server is ${HOST_SERVER_NAME}";
echo "ROOT is ${ROOT_URL}";
meteor run \
    --settings=settings.json \
    --mobile-server=${HOST_SERVER_URL} \
    --port=${HOST_SERVER_PORT} \
    --verbose \
    --no-lint \
    --allow-superuser \
    --no-release-check
