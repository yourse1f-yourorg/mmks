#!/usr/bin/env bash
#

function aptNotYetInSources() {
#  echo -e "\n  $1";
  return $(grep -r --exclude='*.save' --exclude='*.gpg' "$1" /etc/apt  | grep -v "#" | grep -c $1;);
}


declare -A ARRY;
function splitLeafFromBranch() {

  I=$1;
  B="$(dirname "${I}")/";
  L="${I#$B}";
  B="${B%/}";

  ARRY["branch"]=${B};
  ARRY["leaf"]=${L};

}

export MISSING="";
function isMissing() {

  NAME="${1}";
  VAL="${!1}";
  DEFAULT=$2;
  if [ ${#VAL} -lt 1 ]; then
    MISSING=${MISSING}"\nexport ${NAME}=\"${DEFAULT}\";";
  fi;

}

function areMissing() {
  MSG=$1;
  if [ ${#MISSING} -gt 0 ]; then
    echo -e "\n\n* * * Your environment is missing :\n ${MISSING}";
    echo -e "${MSG}";
    exit 1;
  fi;

}
