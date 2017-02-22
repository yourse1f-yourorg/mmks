#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};

echo PROJECT_ROOT=${PROJECT_ROOT};
${PROJECT_ROOT}/.scripts/free.sh;
#
rm -rf ${PROJECT_ROOT}/.meteor/local;
#
cd ${PROJECT_ROOT};
meteor npm run knex_cont;
#
export X=${HOST_SERVER_PROTOCOL:="http"};
export X=${HOST_SERVER_NAME:="localhost"};
export X=${HOST_SERVER_PORT:="3000"};
export ROOT_URL=${HOST_SERVER_PROTOCOL}://${HOST_SERVER_NAME}:${HOST_SERVER_PORT};
meteor run --settings=settings.json;
