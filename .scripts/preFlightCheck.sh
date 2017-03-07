#!/bin/bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};

PRTY=" Env Vars ::";

function preFlightCheck()
{
	echo -e "${PRTY} Configure environment variables?";
	declare USER_VARS="${HOME}/.userVars.sh";
	declare SVs="false";
  [ -f ${USER_VARS} ] && source ${USER_VARS} || SVs="true";

	[ "$(echo ${NON_STOP} | tr '[a-z]' '[A-Z]')" = "YES" ] || SVs="true";

	if [[ "${SVs}" = "true" ]]; then
    pushd ${PROJECT_ROOT}/.scripts >/dev/null;
	    echo -e "${PRTY} Environment variables need to be set...";
	    source ./ManageShellVars.sh "";
	    loadShellVars;
	    PARM_NAMES=( "YOUR_FULLNAME" "YOUR_ORGANIZATION_NAME" "HOST_SERVER_PROTOCOL" "HOST_SERVER_NAME" "HOST_SERVER_PORT" "KEYSTORE_PWD" "NON_STOP" );
	    askUserForParameters PARM_NAMES[@];
    popd >/dev/null;

	else
	  echo -e "${PRTY} Environment variables seem ready.";
	fi;

	declare SQLITE_DB_DIR='/tmp/db';
	[ ! -d ${SQLITE_DB_DIR} ] \
	    && echo -e "${PRTY} Creating SQLite database directory." \
	    && mkdir ${SQLITE_DB_DIR};

  echo -e "${PRTY} Done preflight.";

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  preFlightCheck;
fi;

