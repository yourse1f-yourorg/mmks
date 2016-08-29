#!/usr/bin/env bash
#
export PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
cd ${PWD};

source ../utils.sh;

export ENV_FILE="${HOME}/.profile";
source ${ENV_FILE};

isMissing KEYSTORE_PWD;
isMissing ANDROID_PLACE "${HOME}/.android";
isMissing ANDROID_SDK "android-sdk-linux";
isMissing HOST_SERVER_NAME;

areMissing  "\n* * * Suggested values were inferred. They will have to be manually appended to '${HOME}/.profile'.";


# echo "Adding environment variable to project in CircleCI.";
# export HEADER_JSON="--header \"Content-Type: application/json\"";
# export VAR_JSON="'{\"name\":\"KEYSTORE_PWD\", \"value\":\"${KEYSTORE_PWD}\"}'";
# echo "curl -s -X POST ${HEADER_JSON} -d ${VAR_JSON} https://circleci.com/api/v1/project/${GITHUB_ORGANIZATION_NAME}/${PROJECT_NAME}/envvar?circle-token=${CIRCLECI_PERSONAL_TOKEN};"
# eval curl -s -X POST ${HEADER_JSON} -d ${VAR_JSON} https://circleci.com/api/v1/project/${GITHUB_ORGANIZATION_NAME}/${PROJECT_NAME}/envvar?circle-token=${CIRCLECI_PERSONAL_TOKEN};
# exit;
export JQ=$(jq --version 2>/dev/null);
if [ ${#JQ} -lt 1 ]; then echo -e "\n\n* * * You need to run: \n\n     sudo apt install -y jq \n\n"; exit; fi;

export ORCL_JDK=$(java -version 2>&1 | grep -ic hotspot);
if [ ${ORCL_JDK} -lt 1 ]; then echo -e "\n\n* * * You need to run: \n\n   $(pwd)/installJDK.sh \n\n"; exit; fi;

