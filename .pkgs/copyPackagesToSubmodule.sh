#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;

function copyPackagesToSubmodule() {
  local CONTAINER_PKGS_DIR=$1;
  local SUBMODULE_PKGS_DIR=$2;
  echo -e "### Identifying available npm packages for user app";
  pushd ${CONTAINER_PKGS_DIR} >/dev/null;

    for PKGE in ./*/
    do
      if touch ${PKGE}package.json 2>/dev/null; then
        if [[ "X$(cat ${PKGE}package.json  | jq -r .name)X" != "XX" ]]; then
          echo -e "~~~~~~~~~~  Copy '${PKGE}' into submodule ~~~~~~~~~~~~~~~~~~~~";
          cp -r ${PKGE} ${SUBMODULE_PKGS_DIR}/gitignored_$(basename ${PKGE});
        fi;
      fi;
    done
#    echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

  popd >/dev/null;

}

# if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
#   copyPackagesToSubmodule ${SCRIPTPATH} ;
# fi;
