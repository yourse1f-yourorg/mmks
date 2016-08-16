#!/bin/bash
#
echo "IN  : >>>>>>>>>>>>>>>     Purging old version     <<<<<<<<<<<<<<<";

MUP_DIR="/opt/${REPO_PROJECT_NAME}";
sudo rm -fr ${MUP_DIR};

MONGO_DIR="/opt/mongodb";
sudo rm -fr ${MONGO_DIR};

DOCKER_INSTALLED=$(docker --version 2>/dev/null);
DOCKER_INSTALLED=${#DOCKER_INSTALLED}
if [[  "${DOCKER_INSTALLED}" -gt 0  ]]; then
  echo -e "Docker is installed. Clearing old residue."  ;

  CONTAINER_COUNT=$(docker ps -a -q);
  echo -e "Containers are : \n ${CONTAINER_COUNT}" ;
  CONTAINER_COUNT=${#CONTAINER_COUNT}
  if [[  "${CONTAINER_COUNT}" -gt 0  ]]; then
    echo -e "Stopping containers . . .";
    docker stop $(docker ps -a -q);
    echo -e "Purging containers . . .";
    docker rm $(docker ps -a -q);
    echo -e ". . . purged containers.";
  else
    echo -e "Did not find any Docker containers.";
  fi;

  IMAGES_COUNT=$(docker images -a -q);
  echo -e "Images are : \n ${IMAGES_COUNT}" ;
  IMAGES_COUNT=${#IMAGES_COUNT}
  if [[  "${IMAGES_COUNT}" -gt 0  ]]; then
    echo -e "Purging images . . .";
    docker rmi $(docker images -a -q);
  else
    echo -e "Did not find any Docker images.";
  fi;

else

  echo -e "Did not find Docker installed. ${DOCKER_INSTALLED}";
fi;

echo "OUT : >>>>>>>>>>>>>>>      Purged old version     <<<<<<<<<<<<<<<";
