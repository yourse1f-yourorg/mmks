#!/usr/bin/env bash
#
export PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
cd ${PWD};

# declare -A ARRY;
# function splitLeafFromBranch() {

#   I=$1;
#   B="$(dirname "${I}")/";
#   L="${I#$B}";
#   B="${B%/}";

#   ARRY["branch"]=${B};
#   ARRY["leaf"]=${L};

# }

source ./chkVarsForDeploy.sh;

export MISSING="";
function pushEnvVarToCircleCI() {
  
  NAME="${1}";
  VAL="${!1}";
#  echo "${NAME} = ${VAL}"; 
  export VAR_JSON="'{\"name\":\"${NAME}\", \"value\":\"${VAL}\"}'";
#  echo "curl -s -X POST ${HEADER_JSON} -d ${VAR_JSON} https://circleci.com/api/v1/project/${GITHUB_ORGANIZATION_NAME}/${PROJECT_NAME}/envvar?circle-token=${CIRCLECI_PERSONAL_TOKEN};"
  eval curl -s -X POST ${HEADER_JSON} -d ${VAR_JSON} https://circleci.com/api/v1/project/${GITHUB_ORGANIZATION_NAME}/${PROJECT_NAME}/envvar?circle-token=${CIRCLECI_PERSONAL_TOKEN};
  echo -e "\n";

}

echo "Adding environment variable to project in CircleCI.";
export HEADER_JSON="--header \"Content-Type: application/json\"";

pushEnvVarToCircleCI PROJECT_NAME;
pushEnvVarToCircleCI PARENT_DIR;
pushEnvVarToCircleCI TMP_DIRECTORY;
pushEnvVarToCircleCI GITHUB_ORGANIZATION_NAME;
pushEnvVarToCircleCI ANDROID_PLACE;
pushEnvVarToCircleCI ANDROID_SDK;
pushEnvVarToCircleCI HOST_SERVER_NAME;
pushEnvVarToCircleCI KEYSTORE_PWD;

