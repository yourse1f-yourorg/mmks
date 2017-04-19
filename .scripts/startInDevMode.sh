#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};

pushd ${PROJECT_ROOT}/meteor-mantra-kickstarter >/dev/null;
  .scripts/startInDevMode.sh;
popd >/dev/null;
