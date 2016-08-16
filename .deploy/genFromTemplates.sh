if [[  ${#REPO_PROJECT_NAME} -gt 1 ]]; then

  cat preClean.tmplt.sh | envsubst '${REPO_PROJECT_NAME}' > preClean.sh
  cat mup.tmplt.js | envsubst > mup.js
  cat postSetup.tmplt.sh | envsubst '${HOST_SERVER_NAME} ${HOST_USER_NAME} ${REPO_PROJECT_NAME}' > postSetup.sh
  chmod a+x postSetup.sh;

else

  echo "Project repo name is required. Found, >${REPO_PROJECT_NAME}<";
  exit;

fi;

