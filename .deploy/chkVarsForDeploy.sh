#!/usr/bin/env bash
#
export PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
cd ${PWD};

source ./utils.sh;

export ENV_FILE="${HOME}/.profile";
source ${ENV_FILE};

splitLeafFromBranch ${PWD};
BRANCH=${ARRY['branch']};
LEAF=${ARRY['leaf']};
# echo "${BRANCH}    /   ${PRJCT}";

splitLeafFromBranch ${BRANCH};
BRANCH=${ARRY['branch']};
PRJCT=${ARRY['leaf']};
# echo "${BRANCH}    /   ${PRJCT}";

splitLeafFromBranch ${BRANCH};
BRANCH=${ARRY['branch']};
PARENT=${ARRY['leaf']};
# echo "${BRANCH}    /   ${PARENT}";

splitLeafFromBranch ${BRANCH};
BRANCH=${ARRY['branch']};
BASE=${ARRY['leaf']};
# echo "${BRANCH}    /   ${BASE}";

isMissing PROJECT_NAME ${PRJCT};
isMissing PARENT_DIR ${PARENT};
isMissing TMP_DIRECTORY "/tmp/buildMeteor"; 

isMissing GITHUB_ORGANIZATION_NAME;
isMissing CIRCLECI_PERSONAL_TOKEN;

areMissing  "\n* * * Suggested values were inferred. They will have to be manually appended to '${HOME}/.profile'.";

