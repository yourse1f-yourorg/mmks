#!/usr/bin/env bash
#

function updateOrAddKVPair() {

  # echo "PKG_JSN -- ${PKG_JSN}";
  # echo "MRKR -- ${MRKR}";
  local KEY="\"${1}\"";
  local VAL="\"${2}\"";
  local REPLACEMENT="";
  echo "KEY -- ${KEY}";
  echo "VAL -- ${VAL}";

  if grep ${KEY} ${PKG_JSN}; then

    sed -i "/${KEY}/c\ \ ${KEY}: ${VAL}," ${PKG_JSN};

  else

    REPLACEMENT+="  ${KEY}: ${VAL},";
    REPLACEMENT+="\n  ${MRKR}: {";
    sed -i "s|.*${MRKR}.*|${REPLACEMENT}|" ${PKG_JSN};

  fi;
  echo -e "-------
$(grep ${KEY} ${PKG_JSN})
--------";

}


function PatchPkgJson() {

  export PKG_JSN=${1};
  export MRKR="\"scripts\"";

  head -n 15 ${PKG_JSN};

  updateOrAddKVPair "name" "${TARGET_PROJECT_NAME}";
  updateOrAddKVPair "version" "0.1.4";
  updateOrAddKVPair "license" "MIT";
  updateOrAddKVPair "repository" "https://github.com/${PROJECT_UUID}";


};

export TARGET_PROJECT_NAME="mmks";
export PROJECT_UUID="yourse1f-yourorg/mmks";

# sed -i "s|.*scripts.*|${REPLACEMENT}|" ./package.json;
PatchPkgJson "./package.json";
