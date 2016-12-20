#!/usr/bin/env bash
#
SCRIPT=$(readlink -f "$0");
SCRIPTPATH=$(dirname "$SCRIPT");

declare HABITAT_DIR="$(pwd)/.habitat";

echo -e "Path == ${SCRIPTPATH}";
echo -e "Habi == ${HABITAT_DIR}";


declare GITHUB_RAW="https://raw.githubusercontent.com";
declare HAB_ORG="your0rg";
declare HAB_REPO="HabitatForMeteor";
declare HABITAT="master/habitat";
declare SCRIPTS_DIR="scripts";

function pullHabitatForMeteorScripts() {

  echo -e "Getting 'Habitat For Meteor' scripts ...";

  pushd ${HABITAT_DIR} >/dev/null;

    wget -nc ${GITHUB_RAW}/${HAB_ORG}/${HAB_REPO}/${HABITAT}/BuildAndUpload.sh &>/dev/null;
    chmod ug+x,o-rwx BuildAndUpload.sh;

    mkdir -p ${SCRIPTS_DIR};
    pushd ${SCRIPTS_DIR} >/dev/null;

      wget -nc ${GITHUB_RAW}/${HAB_ORG}/${HAB_REPO}/${HABITAT}/${SCRIPTS_DIR}/ManageShellVars.sh &>/dev/null;
      wget -nc ${GITHUB_RAW}/${HAB_ORG}/${HAB_REPO}/${HABITAT}/${SCRIPTS_DIR}/VersionControl.sh &>/dev/null;
      wget -nc ${GITHUB_RAW}/${HAB_ORG}/${HAB_REPO}/${HABITAT}/${SCRIPTS_DIR}/utils.sh &>/dev/null;
      wget -nc ${GITHUB_RAW}/${HAB_ORG}/${HAB_REPO}/${HABITAT}/${SCRIPTS_DIR}/shellVars.sh &>/dev/null;
      chmod ug+x,o-rwx *.sh;

    popd >/dev/null;

  popd >/dev/null;

  echo -e "Got 'Habitat For Meteor' scripts ...";

}


function downloadHabToPathDir() {

  INST_HOST="https://api.bintray.com";
  INST_STABLE="content/habitat/stable";
  INST_PATH="${INST_HOST}/${INST_STABLE}";

  INST_MAC="darwin";
  INST_LNX="linux";

  INST_SFX_MAC="zip";
  INST_SFX_LNX="tar.gz";
  INST_SFX="${INST_SFX_LNX}";

  INST_FILE="hab-%24latest";

  INST_PARM="bt_package";

  ARCH="x86_64";

  OS="darwin";
  OS="linux";
  OS="${1:-linux}";

  DEST_DIR="${2:-/usr/bin}";

  if [ "${OS}" = "${INST_MAC}" ]; then
    INST_SFX="${INST_SFX_MAC}";
    # echo "APPLE https://api.bintray.com/content/habitat/stable/darwin/x86_64/hab-%24latest-x86_64-darwin.zip   ?bt_package=hab-x86_64-darwin";
  else
    INST_SFX="${INST_SFX_LNX}";
    # echo "LINUX https://api.bintray.com/content/habitat/stable/linux/x86_64/hab-%24latest-x86_64-linux.tar.gz?bt_package=hab-x86_64-linux";
  fi;

  INST_BUNDLE="${INST_FILE}-${ARCH}-${OS}.${INST_SFX}";
  INST_TRGT="hab-${ARCH}-${OS}.${INST_SFX}";
  INST_URL="${INST_PATH}/${OS}/${ARCH}/${INST_BUNDLE}?${INST_PARM}=hab-${ARCH}-${OS}";

  PATTERN="hab-*-${ARCH}-${OS}";


  # echo "TRGT  ${INST_TRGT}";
  # echo "DWNLD ${INST_URL}";
  # echo "TOWRD ${DEST_DIR}";
  pushd /tmp >/dev/null;

    echo -e "Getting Habitat as :: $(pwd)/${INST_TRGT} ${INST_URL}";
    wget --quiet -N -O ${INST_TRGT} ${INST_URL};

    rm -fr ${PATTERN};
    tar zxf ${INST_TRGT};

    INST_DIR=$( ls -d ${PATTERN} );
    echo "Install from ${INST_DIR}/hab to ${DEST_DIR}";

    sudo mv ${INST_DIR}/hab ${DEST_DIR};
    DEST_FILE=${DEST_DIR}/hab;
    sudo chmod 755 ${DEST_FILE};
    sudo chown root:root ${DEST_FILE};

    rm -fr ${PATTERN};

  popd >/dev/null;

}


function installHabitat() {

  echo -e "\n${PRTY} Verifying installed Habitat version.";
  # HABITAT_VERSION=$(hab --version);
  # set +e; HABITAT_VERSION=$(hab --version 2>/dev/null);set -e;
  # echo -e "\n${PRTY}Detected Habitat version : '${HABITAT_VERSION}'";
  HAB_ALREADY="";
  if [[ -z "$(hab --version 2>/dev/null)" ]]; then
    HAB_ALREADY="now ";
    echo -e "\n${PRTY}Installing Habitat for ${TARGET_OPERATING_SYSTEM} ...";
#    . ./DownloadHabitatToPathDir.sh  
    downloadHabToPathDir ${TARGET_OPERATING_SYSTEM};
  else
    echo -e "\n${PRTY}Found Habitat installed already..";
  fi;

  sudo hab install core/hab-sup;
  sudo hab pkg binlink core/hab-sup hab-sup;

  echo -e "'Habitat' version '$(hab --version 2>/dev/null)' is ${HAB_ALREADY}installed and ready.

  Getting 
  ";

  pullHabitatForMeteorScripts;

}
