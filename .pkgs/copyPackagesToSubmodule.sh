#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;


declare PKG_EXCLUSIONS="package_exclusions.json";
declare PKG_EXCL_PATH="./${PKG_EXCLUSIONS}";

declare GITIG_PREFIX="gitignored_";

function copyPackagesToSubmodule() {
  local CONTAINER_PKGS_DIR=$1;
  local SUBMODULE_PKGS_DIR=$2;
  echo -e "### Identifying available npm packages for user app.  ${SCRIPTPATH}";
  echo -e "### Will copy from '${CONTAINER_PKGS_DIR}' to '${SUBMODULE_PKGS_DIR}'";

  pushd ${CONTAINER_PKGS_DIR} >/dev/null;

    declare EXCLUSIONS=$(jq -r .packages_excluded_from_wrapper ${PKG_EXCL_PATH});
    echo -e "Exclusions ...\n${EXCLUSIONS}";
    for MODULE_PATH in ./*/
    do
      # echo -e "###  ${MODULE_PATH}";
      NODE_META=${MODULE_PATH}package.json;
      # echo ${NODE_META};
      if [[ -r ${NODE_META} && -f ${NODE_META} ]]; then
        MDL=$(cat ${NODE_META}  | jq -r .name);
        # echo -e "MDL = ${MDL}";
        if [[ "X${MDL}X" != "XX" ]]; then
          EXCLUDE=$(echo ${EXCLUSIONS} | jq ". | contains([\"${MDL}\"])");
          echo -e "~~~~~~~~~~  Exclude '${MDL}' from project? ${EXCLUDE} ~~~~~~~~~~~";
          if [[ "true" != "${EXCLUDE}" ]]; then
            echo -e " Copying '${MDL}' to project .pkgs/${GITIG_PREFIX}$(basename ${MODULE_PATH})  ~~~~~~~~~~~";

            # echo "${MDL} to list >>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
            # echo "${MDL}" >> ${LOCAL_NODEJS_ PACKAGES_LIST};                DEPRECATED ????

            cp -r ${MODULE_PATH} ${SUBMODULE_PKGS_DIR}/${GITIG_PREFIX}$(basename ${MODULE_PATH});

          fi;
        fi;
      fi;

     done
   echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

   popd >/dev/null;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  SUB_MDL_PKG_DIR=${SCRIPTPATH}/../meteor-mantra-kickstarter/.pkgs
  copyPackagesToSubmodule ${SCRIPTPATH} ${SUB_MDL_PKG_DIR};
fi;
