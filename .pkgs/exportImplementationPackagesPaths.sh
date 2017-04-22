#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;

declare METEOR_CMD="${METEOR_CMD:=${HOME}/.meteor/meteor}";

function exportImplementationPackagesPaths() {
  local PKGS_DIR=$1;
  echo -e "### Identifying available npm packages for user App";
  pushd ${PKGS_DIR} >/dev/null;

    for MODULE_PATH in ./*/
    do
      if touch ${MODULE_PATH}package.json 2>/dev/null; then
        if [[ "X$(cat ${MODULE_PATH}package.json  | jq -r .name)X" != "XX" ]]; then
          echo -e "~~~~~~~~~~  Link '${MODULE_PATH}' into project ~~~~~~~~~~~~~~~~~~~~";
          pushd ${MODULE_PATH} >/dev/null;
            echo "$(basename ${MODULE_PATH})" >> ${LOCAL_NODEJS_PACKAGES_LIST};
            ${METEOR_CMD} npm link;
          popd >/dev/null;
        fi;
      fi;
    done
#    echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

  popd >/dev/null;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  exportImplementationPackagesPaths ${SCRIPTPATH};
fi;
