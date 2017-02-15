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
export HOST_SERVER_NAME="http://moon.planet.sun:3000/";
export ROOT_URL="${HOST_SERVER_NAME}";
export YOUR_FULLNAME="You Yourself";
export GITHUB_ORGANIZATION_NAME="YourOrg";
#
cd ${PROJECT_ROOT};
meteor npm run knex_cont;
#
meteor run \
    --settings=settings.json \
    --mobile-server=${HOST_SERVER_NAME} \
    --verbose \
    --no-lint \
    --no-release-check
