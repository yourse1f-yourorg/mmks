#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};

pushd ${PROJECT_ROOT}/meteor-mantra-kickstarter/.scripts >/dev/null;
  ./installMeteorApp.sh;
popd >/dev/null;
