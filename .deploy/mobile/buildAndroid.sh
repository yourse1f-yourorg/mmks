#!/usr/bin/env bash
#
export PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
cd ${PWD};

export ENV_FILE="${HOME}/.profile";
source ${ENV_FILE};


source ../utils.sh;
source ../chkVarsForDeploy.sh;
source ./mobile/chkVarsForMobile.sh;

export ANDROID_HOME=${ANDROID_PLACE}/${ANDROID_SDK};
# echo ${ANDROID_HOME};
export BUILD_DIRECTORY="${HOME}/${PARENT_DIR}/${PROJECT_NAME}";
# echo ${BUILD_DIRECTORY};
export ZIPALIGN_PATH=${ANDROID_HOME}/build-tools/23.0.3
# echo ${ZIPALIGN_PATH};


if [[ ${CIRCLECI} ]]; then
  echo -e "We are running in a CircleCI virtual machine";
#  echo -e "   * * * WARNING THIS IS SUPPOSED TO BE TEMPORARY  * * * ";
else
  echo -e "Preparing CircleCI with environment variables . . . ";
  source ../pushDeploySecretsToCircleCI.sh;
  echo -e ". . . environment variables uploaded to CircleCI";
fi;

source ./android/AutomatedDeployment_functions.sh;

if [ "${RUN_RULE}" != "n" ]; then PrepareAndroidSDK; fi;
if [ "${RUN_RULE}" != "n" ]; then PrepareToBuildAndroidAPK; fi;
if [ "${RUN_RULE}" != "n" ]; then BuildAndroidAPK; fi;

export RUN_RULE="n";
if [ "${RUN_RULE}" != "n" ]; then DeployToMeteorServers; fi;
if [ "${RUN_RULE}" != "n" ]; then PrepareCIwithAndroidSDK; fi;
if [ "${RUN_RULE}" != "n" ]; then PrepareCIwithAndroidBuilder; fi;
if [ "${RUN_RULE}" != "n" ]; then PrepareCIwithMeteorDeployment; fi;
if [ "${RUN_RULE}" != "n" ]; then ShowStatusSymbol; fi;
if [ "${RUN_RULE}" != "n" ]; then VersionMonitorTemplate; fi;
if [ "${RUN_RULE}" != "n" ]; then PushFinalChanges; fi;

