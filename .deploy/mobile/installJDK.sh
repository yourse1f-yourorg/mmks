#!/usr/bin/env bash
#

export PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
pushd ${PWD};

source ../utils.sh;

function getWebupd8_PPA() {

  echo -e "# -- Get PPAs for Oracle Java 7 and update APT --";
  PPA="webupd8team/java";
  if aptNotYetInSources ${PPA}; then
    echo "go";
    sudo add-apt-repository -y ppa:${PPA};
    pushd /tmp  >/dev/null; sudo apt-get update; popd >/dev/null;
  else
    echo "Found '${PPA}' among apt sources already.";
  fi;

}


function installJava7() {

  echo -e # -- Install Oracle Java 7 --
  export ORCL_JDK=$(java -version 2>&1 | grep -ic hotspot);
  if [ ${ORCL_JDK} -lt 1 ]; then

    echo "java is not installed.";
    echo -debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections;
    echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections;
    sudo apt-get -y install oracle-java7-installer;

  fi;

}

getWebupd8_PPA;
installJava7;
