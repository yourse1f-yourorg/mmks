#!/bin/bash
#
echo "IN  : >>>>>>>>>>>>>>> Setting up private elements <<<<<<<<<<<<<<<";

MUP_CONFIG_DIR="/opt/${REPO_PROJECT_NAME}/config";
sudo mkdir -p ${MUP_CONFIG_DIR};

cp /home/${HOST_USER_NAME}/.ssh/${HOST_SERVER_NAME}_bundle.crt ${MUP_CONFIG_DIR}/bundle.crt
openssl rsa -passin file:/home/${HOST_USER_NAME}/.ssh/${HOST_SERVER_NAME}.pkp -in /home/${HOST_USER_NAME}/.ssh/${HOST_SERVER_NAME}.key -out ${MUP_CONFIG_DIR}/private.key 

echo "OUT : >>>>>>>>>>>>>>>   Set up private elements   <<<<<<<<<<<<<<<";
