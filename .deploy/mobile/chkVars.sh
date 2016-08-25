export ENV_FILE="${HOME}/.profile";
source ${ENV_FILE};

export MISSING="";
export SEP="\nexport ";
export SUF="=\"\";";
if [ ${#ANDROID_PLACE} -gt 0 ];
then echo ANDROID_PLACE=${ANDROID_PLACE}; 
else MISSING=${MISSING}${SEP}ANDROID_PLACE${SUF};
fi;

if [ ${#ANDROID_SDK} -gt 0 ];
then echo ANDROID_SDK=${ANDROID_SDK};
else MISSING=${MISSING}${SEP}ANDROID_SDK${SUF};
fi;

if [ ${#KEYSTORE_PWD} -gt 0 ];
then echo KEYSTORE_PWD=${KEYSTORE_PWD};
else MISSING=${MISSING}${SEP}KEYSTORE_PWD${SUF};
fi;

if [ ${#TARGET_SERVER_URL} -gt 0 ];
then echo TARGET_SERVER_URL=${TARGET_SERVER_URL};
else MISSING=${MISSING}${SEP}TARGET_SERVER_URL${SUF};
fi;

if [ ${#PROJECT_NAME} -gt 0 ];
then echo PROJECT_NAME=${PROJECT_NAME};
else MISSING=${MISSING}${SEP}PROJECT_NAME${SUF};
fi;

if [ ${#TMP_DIRECTORY} -gt 0 ];
then echo TMP_DIRECTORY=${TMP_DIRECTORY};
else MISSING=${MISSING}${SEP}TMP_DIRECTORY${SUF};
fi;

if [ ${#PARENT_DIR} -gt 0 ];
then echo PARENT_DIR=${PARENT_DIR};
else MISSING=${MISSING}${SEP}PARENT_DIR${SUF};
fi;

if [ ${#ZIPALIGN_BOUNDARY} -gt 0 ];
then echo ZIPALIGN_BOUNDARY=${ZIPALIGN_BOUNDARY};
else MISSING=${MISSING}${SEP}ZIPALIGN_BOUNDARY${SUF};
fi;


if [ ${#MISSING} -gt 0 ];
then echo -e "\n\n* * * Your environment is missing : ${MISSING}"; exit;
fi;

export JQ=$(jq --version 2>/dev/null);
if [ ${#JQ} -lt 1 ]; then echo -e "\n\n* * * You need to run: \n\n     sudo apt install -y jq \n\n"; exit; fi;

export ORCL_JDK=$(java -version 2>&1 | grep -ic hotspot);
if [ ${ORCL_JDK} -lt 1 ]; then echo -e "\n\n* * * You need to run: \n\n   $(pwd)/installJDK.sh \n\n"; exit; fi;

