#!/bin/bash
#
echo "IN  : >>>>>>>>>>>>>>> Setting up private elements <<<<<<<<<<<<<<<";

# Reference note : https://github.com/meteorhacks/mup-frontend-server

MUP_STAGING_DIR="/opt/${REPO_PROJECT_NAME}";
MUP_CONFIG_DIR="${MUP_STAGING_DIR}/config";

echo "recreate dir : ${MUP_CONFIG_DIR}";
rm -fr ${MUP_CONFIG_DIR};        #  In case /opt/${REPO_PROJECT_NAME} gets cached 
sudo mkdir -p ${MUP_CONFIG_DIR};
sudo chown -R ${USER}:${USER} ${MUP_STAGING_DIR};
ls -l ${MUP_STAGING_DIR}/..;
ls -l ${MUP_STAGING_DIR};

echo "cp /home/${HOST_USER_NAME}/.ssh/${HOST_SERVER_NAME}_bundle.crt ${MUP_CONFIG_DIR}/bundle.crt;";
cp /home/${HOST_USER_NAME}/.ssh/${HOST_SERVER_NAME}_bundle.crt \
                                  ${MUP_CONFIG_DIR}/bundle.crt;

echo "openssl rsa -passin file:/home/${HOST_USER_NAME}/.ssh/${HOST_SERVER_NAME}.pkp -in /home/${HOST_USER_NAME}/.ssh/${HOST_SERVER_NAME}.key -out ${MUP_CONFIG_DIR}/private.key;";
openssl rsa -passin \
    file:/home/${HOST_USER_NAME}/.ssh/${HOST_SERVER_NAME}.pkp \
     -in /home/${HOST_USER_NAME}/.ssh/${HOST_SERVER_NAME}.key \
     -out ${MUP_CONFIG_DIR}/private.key;
echo "regenerated private key . . .";

echo "OUT : >>>>>>>>>>>>>>>   Set up private elements   <<<<<<<<<<<<<<<";
