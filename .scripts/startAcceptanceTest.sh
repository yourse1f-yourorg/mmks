#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;

declare PROJECT_ROOT=${SCRIPTPATH%/.scripts};
declare E2E_FEATURES=".e2e_tests/features";
declare TRANSIENT_FEATURES_PREFIX=5;
declare WILDCARD="${TRANSIENT_FEATURES_PREFIX}*";
declare E2E_FEATURES_PATH="/dev/null";

pushd ${PROJECT_ROOT}/meteor-mantra-kickstarter >/dev/null;

  if pushd ${E2E_FEATURES} &>/dev/null; then
    E2E_FEATURES_PATH=$(pwd);
    echo -e "Doing.";
    find . -type l -iname "${WILDCARD}" | xargs rm 2>/dev/null;
    popd &>/dev/null;
  fi;

  pushd .pkgs >/dev/null;

    let COUNTER=$(( 100 * TRANSIENT_FEATURES_PREFIX ));
    echo -e "COUNTER is ${COUNTER}";
    for MODULE_PATH in ./*/
    do
      if touch ${MODULE_PATH}package.json 2>/dev/null; then
        MODULE=$(cat ${MODULE_PATH}package.json  | jq -r .name);
        if [[ "X${MODULE}X" != "XX" ]]; then
          echo -e "~~~~~~~~~~  Link '${MODULE}' into project ~~~~~~~~~~~~~~~~~~~~";
          pushd ${MODULE_PATH} >/dev/null;
            if [[ -d ${E2E_FEATURES} ]]; then
              ((COUNTER++));
              ls ${E2E_FEATURES};
              MODULE_NAME=$(ls ${E2E_FEATURES});
              pushd ${E2E_FEATURES_PATH} >/dev/null;
                echo -e "ln -s ../../.pkgs/$(basename ${MODULE_PATH})/.e2e_tests/features/${MODULE_NAME} ${COUNTER}_${MODULE_NAME}";
                ln -s ../../.pkgs/$(basename ${MODULE_PATH})/.e2e_tests/features/${MODULE_NAME} ${COUNTER}_${MODULE_NAME};
              popd >/dev/null;
            fi;
          popd >/dev/null;
        fi;
      fi;
    done;

  popd >/dev/null;

  # pushd ${E2E_FEATURES} &>/dev/null \
  #   && ( ls -la ) \
  #   && popd;

  .scripts/startAcceptanceTest.sh;

popd >/dev/null;
echo -e "=================================================
";
