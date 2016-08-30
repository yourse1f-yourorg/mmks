#!/bin/bash
#
echo "IN  : >>>>>>>>>>>>>>> Setting up private elements <<<<<<<<<<<<<<<";

MUP_CONFIG_DIR="/opt/${REPO_PROJECT_NAME}/config";

echo "recreate dir : ${MUP_CONFIG_DIR}";
rm -fr ${MUP_CONFIG_DIR};        #  In case /opt/${REPO_PROJECT_NAME} gets cached 
sudo mkdir -p ${MUP_CONFIG_DIR};

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
