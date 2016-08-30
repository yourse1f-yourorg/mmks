#!/bin/bash
#

pushd `dirname $0` > /dev/null

echo "IN  : >>>>>>>>>>>>>>> ci_deploy.sh <<<<<<<<<<<<<<<";
echo -e " * * * Begin deploying ${REPO_PROJECT_NAME} to ${HOST_SERVER_NAME}."


if [[ -f .profile_staging ]]; then source .profile_staging; fi;

echo -e "     * Generate real files from templates.";
./genFromTemplates.sh;

if [  "${PURGE_AND_RECREATE}" == "true" ]; then

  echo -e "     * Purge all before starting to deploy. ${PURGE_AND_RECREATE} ";
  echo "ssh ${HOST_USER_NAME}@${HOST_SERVER_NAME} 'bash -s' < preClean.sh"
  ssh ${HOST_USER_NAME}@${HOST_SERVER_NAME} 'bash -s' < preClean.sh

  echo -e "     * Prepare host server with 'mup setup' before running 'mup deploy'";
  # DEBUG=* ${MUP_CMD} setup;
  DEBUG=* ${MUP_CMD} setup;

  echo -e "     * Update host server with secrets after running 'mup setup'";
  ssh ${HOST_USER_NAME}@${HOST_SERVER_NAME} 'bash -s' < postSetup.sh

fi;

echo -e "     * Deploy ${REPO_PROJECT_NAME} to the host ${HOST_SERVER_NAME} using 'mup deploy'";
export PATH=${HOME}/.meteor:${PATH};
# DEBUG=* ${MUP_CMD} deploy --settings=../settings.json;
${MUP_CMD} deploy --settings=../settings.json > ${CIRCLE_ARTIFACTS}/mup_deployment.log;

echo -e "     * Cleaning up.";
rm -f preClean.sh
rm -f mup.js
rm -f postSetup.sh

echo -e " * * * Done deploying ${REPO_PROJECT_NAME} to ${HOST_SERVER_NAME}."

echo "OUT : >>>>>>>>>>>>>>> ci_deploy.sh <<<<<<<<<<<<<<<";
popd > /dev/null
