#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;

declare PROJECT_ROOT=${SCRIPTPATH%/.scripts};
declare E2E_FEATURES=".e2e_tests/features";
declare TRANSIENT_FEATURES_PREFIX=5;
declare WILDCARD="${TRANSIENT_FEATURES_PREFIX}*";
declare E2E_FEATURES_PATH="/dev/null";

declare GITIG_PREFIX="gitignored_";

declare PKG_EXCLUSIONS="package_exclusions.json";
declare PKG_EXCL_PATH=".pkgs/${PKG_EXCLUSIONS}";

declare CORE_EXCLUSIONS=$(jq -r .packages_excluded_from_core ${PKG_EXCL_PATH});
# echo -e "Core Excl : ${CORE_EXCLUSIONS}";

declare CONTAINER_EXCLUSIONS=$(jq -r .packages_excluded_from_wrapper ${PKG_EXCL_PATH});
# echo -e "Wrapper Excl : ${CONTAINER_EXCLUSIONS}";

pushd ${PROJECT_ROOT}/meteor-mantra-kickstarter >/dev/null;

  if pushd ${E2E_FEATURES} &>/dev/null; then
    E2E_FEATURES_PATH=$(pwd);
    echo -e "Doing.";
    find . -type l -iname "${WILDCARD}" | xargs rm 2>/dev/null;  # purge transient tests
    popd &>/dev/null;
  fi;

  pushd .pkgs >/dev/null;

    let COUNTER=$(( 100 * TRANSIENT_FEATURES_PREFIX ));
    echo -e "Prefix is ${COUNTER}";
    for MODULE_PATH in ./*/
    do
      if touch ${MODULE_PATH}package.json 2>/dev/null; then

        MODULE_FILENAME=$(basename ${MODULE_PATH})
        MODULE_CODENAME=${MODULE_FILENAME#${GITIG_PREFIX}};
        EXCLUDE=true;
        if [[  ${MODULE_FILENAME} = ${MODULE_CODENAME} ]]; then
          # echo -e "Core : ${MODULE_CODENAME}";
          EXCLUDE=$(echo ${CORE_EXCLUSIONS} | jq ". | contains([\"${MODULE_CODENAME}\"])");
        else
          # echo -e "Container : ${MODULE_CODENAME}";
          EXCLUDE=$(echo ${CONTAINER_EXCLUSIONS} | jq ". | contains([\"${MODULE_CODENAME}\"])");
        fi;

        if [[  ${EXCLUDE} != "true"  ]]; then
          MODULE=$(cat ${MODULE_PATH}package.json  | jq -r .name);
          if [[ "X${MODULE}X" != "XX" ]]; then
            pushd ${MODULE_PATH} >/dev/null;
              if [[ -d ${E2E_FEATURES} ]]; then
                ((COUNTER++));
                # ls ${E2E_FEATURES};
                MODULE_NAME=$(ls ${E2E_FEATURES});
                echo -e "~~~~~~~~~~  Link '${MODULE}' e2e tests into submodule as '${COUNTER}_${MODULE_NAME}'  ~~~~~~~~~~~~~~~~~~~~";
                pushd ${E2E_FEATURES_PATH} >/dev/null;
                  # echo -e "ln -s ../../.pkgs/$(basename ${MODULE_PATH})/.e2e_tests/features/${MODULE_NAME} ${COUNTER}_${MODULE_NAME}";
                  ln -s ../../.pkgs/$(basename ${MODULE_PATH})/.e2e_tests/features/${MODULE_NAME} ${COUNTER}_${MODULE_NAME};
                popd >/dev/null;
              else
                echo -e "~~~~~~~~~~  '${MODULE}' has no e2e tests ~~~~~~~~~~~~~~~~~~~~\n{none}";
              fi;
            popd >/dev/null;
          fi;
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
