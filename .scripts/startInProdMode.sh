#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};

echo PROJECT_ROOT=${PROJECT_ROOT};
${PROJECT_ROOT}/.scripts/free.sh;
#
function useKnex() {

  pushd ${PROJECT_ROOT}/server/api/.knex
    knex migrate:rollback --env production;
    knex migrate:latest --env production;
    knex seed:run --env production;
  popd;
  #
}
rm -rf ${PROJECT_ROOT}/.meteor/local;
#
useKnex;
#
export HOST_SERVER_NAME="http://moon.planet.sun:3000/";
export ROOT_URL="${HOST_SERVER_NAME}";
export YOUR_FULLNAME="You Yourself";
export GITHUB_ORGANIZATION_NAME="YourOrg";
#
cd ${PROJECT_ROOT};
meteor run \
    --production \
    --settings=settings.json \
    --mobile-server=${HOST_SERVER_NAME} \
    --verbose \
    --no-lint \
    --no-release-check
