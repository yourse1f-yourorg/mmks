#!/bin/bash
#

export PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
pushd ${PWD};

source ./chkVars.sh;
source ./utils.sh;

export ANDROID_HOME=${ANDROID_PLACE}/${ANDROID_SDK};
echo ${ANDROID_HOME};
export BUILD_DIRECTORY="${HOME}/${PARENT_DIR}/${PROJECT_NAME}";
echo ${BUILD_DIRECTORY};
export ZIPALIGN_PATH=${ANDROID_HOME}/build-tools/23.0.1
echo ${ZIPALIGN_PATH};

source ./android/AutomatedDeployment_functions.sh;
if [ "${RUN_RULE}" != "n" ]; then PrepareAndroidSDK_B; fi;
if [ "${RUN_RULE}" != "n" ]; then BuildAndroidAPK_A; fi;


popd
if [ "${RUN_RULE}" != "n" ]; then BuildAndroidAPK_B; fi;

export RUN_RULE="n";
if [ "${RUN_RULE}" != "n" ]; then DeployToMeteorServers; fi;
if [ "${RUN_RULE}" != "n" ]; then PrepareCIwithAndroidSDK; fi;
if [ "${RUN_RULE}" != "n" ]; then PrepareCIwithAndroidBuilder; fi;
if [ "${RUN_RULE}" != "n" ]; then PrepareCIwithMeteorDeployment; fi;
if [ "${RUN_RULE}" != "n" ]; then ShowStatusSymbol; fi;
if [ "${RUN_RULE}" != "n" ]; then VersionMonitorTemplate; fi;
if [ "${RUN_RULE}" != "n" ]; then PushFinalChanges; fi;

