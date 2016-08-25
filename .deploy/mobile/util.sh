#!/bin/bash
#

function aptNotYetInSources() {

#  echo -e "\n  $1";
  return $(grep -r --exclude='*.save' --exclude='*.gpg' "$1" /etc/apt  | grep -v "#" | grep -c $1;);

}
