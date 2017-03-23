#!/usr/bin/env bash
#
RUN_IT=${1:-null};

# source .scripts/trap.sh;
source .scripts/free.sh;

source .scripts/refreshApt.sh;
source .scripts/installJava.sh;
source .scripts/installNodeJs.sh;
source .e2e_tests/installChimp.sh;
source .scripts/installMeteorFramework.sh;
source .scripts/android/installAndBuildTools.sh;
source .scripts/installMeteorApp.sh;
# source .pkgs/install_local_packages.sh;


storage;
export MINFREE=7000
# export FREESPACE=$(($(stat -f --format="%a*%S" ${HOME})/1000000));
if [ ${FREESPACE} -lt ${MINFREE} ]; then
  echo -e "
             * * *   WARNING * * *
    Your free disk space is: '${FREESPACE}MB'.
     You must have at least: '${MINFREE}MB' free!

------------------------------------------------
  ";
else
  echo "Found '${FREESPACE}MB' of free disk space.";
fi;

memory;
NEEDMEM=1.0;
# FREEMEM=$(awk '/MemFree/ { printf "%.3f \n", $2/1024/1024 }' /proc/meminfo);
# echo "Fail if free:${FREEMEM} -lt  needed:${NEEDMEM}";
if echo ${FREEMEM} ${NEEDMEM} | awk '{exit $1 < $2 ? 0 : 1}'; then
  echo -e "
    * * * WARNING * * *

    You have only ${FREEMEM} of available memory!
    Less then ${NEEDMEM}GB of memory may cause random
    misreported build or execution failures as well as
    longer build times.

  Press any key to continue or <ctrl-c> to quit.
  ";
  read -n 1 -s;
fi;

# if [ -z ${CI} ]; then
#   echo -e "
#       Running in development environment.";
#   if [ ! -f settings.json ]; then
#     if [ -f ${HOME}/.ssh/secrets.sh ]; then
#       echo -e "      Generating 'settings.json' from template";
#       source ${HOME}/.ssh/secrets.sh;
#       ./template.settings.json.sh > settings.json;
#     else
#       echo -e "
#       While the system builds, you should prepare your settings secrets:

#            nano ${HOME}/.ssh/secrets.sh;

#       Press any key to continue or <ctrl-c> to quit.
#       ";
#       read -n 1 -s;
#     fi;
#   fi;
# else
#   echo -e "
#       Running in CircleCI.  Generating 'settings.json' from template";
#   ./template.settings.json.sh > settings.json;
# fi;

declare SECRETS_FILE="${HOME}/.ssh/hab_vault/${HOST_SERVER_NAME}/secrets.sh";
echo -e "${PRTY} Verify 'settings.json' or generate from ${SECRETS_FILE}";
if [[ "${CI}" = "true" ]]; then
  ./template.settings.json.sh > settings.json;
else
  if [ ! -f settings.json ]; then
    if [ -f ${SECRETS_FILE} ]; then
      echo "CC";
      source ${SECRETS_FILE};
      ./template.settings.json.sh > settings.json;
    else
      echo -e "
      Your secret settings were not found at :

           ${SECRETS_FILE};\n";
      exit 1;
    fi;
  fi;
fi;

if [ -f settings.json ]; then
  if [[ -z $(jq -r .LOGGLY_SUBDOMAIN settings.json) ]]; then
    echo -e "
    Your secret settings file, '${SECRETS_FILE}', is incomplete.
    'LOGGLY_SUBDOMAIN' is required\n";
    exit 1;
  fi;
  echo -e "Result : ";
  grep "LOGGLY_SUBDOMAIN" settings.json;
fi;

if [[ "${CI:-false}" == "false" ]]; then
  refreshApt;
  installJava;
  installNodeJs;
  installAndroid;
fi;
installChimp;
installMeteorFramework;
installMeteorApp;

declare MSG="";
if [ -f ./settings.json ]; then
  if [ "${RUN_IT}" = "run" ]; then
    meteor --settings=settings.json;
    MSG="
    Done!
    ";
  else
    MSG="

  Next steps:

      Sanity check
      ~~~~~~~~~~~~

        Terminal #1 : One of ...
           - .scripts/startInDevMode.sh
           - .scripts/startInProdMode.sh # (requires PostgreSQL)
        Terminal #2 : meteor npm run acceptance

*OR*

      Build and launch server for mobile
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        export KEYSTORE_PWD=\"obscuregobbledygook\";
        export HOST_SERVER_NAME=\"http://moon.planet.sun:3000/\";
        export ROOT_URL=\"\${HOST_SERVER_NAME}\";
        export YOUR_FULLNAME=\"You Yourself\";
        export YOUR_ORGANIZATION_NAME=\"YourOrg\";
        ./build_all.sh;
        #
        #  Then run one of these ....
        .scripts/startInDevMode.sh
        # .scripts/startInProdMode.sh # (requires PostgreSQL)   ";

  fi;
else
  MSG="

  Next steps :
     1) # Correctly configure '${HOME}/.ssh/secrets.sh;'
     2) source ${HOME}/.ssh/secrets.sh;
     3) ./template.settings.json.sh > settings.json;
     4) meteor --settings=settings.json
     ";
fi;

echo -e "${MSG}";

exit 0;

export KEYSTORE_PWD="obscuregobbledygook";
export HOST_SERVER_NAME="http://moon.planet.sun:3000/";
export ROOT_URL="${HOST_SERVER_NAME}";
export YOUR_FULLNAME="You Yourself";
export YOUR_ORGANIZATION_NAME="YourOrg";
meteor run --mobile-server=${HOST_SERVER_NAME}  --settings=settings.json;
#

