#!/usr/bin/env bash
#
declare APT_UPDATE=0;
if [ $(dpkg-query -W -f='${Status}' python 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo "Installing 'python'";
  APT_UPDATE=1;
  sudo apt update;
  sudo apt-get install -y python;
fi

if [ $(dpkg-query -W -f='${Status}' g++ 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo "Installing 'g++'";
  APT_UPDATE=1;
  sudo apt update;
  sudo apt-get install -y g++;
fi

if [ $(dpkg-query -W -f='${Status}' build-essential 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo "Installing 'build-essential'";
  if [[ "${APT_UPDATE}" = "0" ]]; then APT_UPDATE=1; sudo apt update; fi;
  sudo apt-get install -y build-essential;
fi

if [ $(dpkg-query -W -f='${Status}' libssl-dev 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo "Installing 'libssl-dev'";
  if [[ "${APT_UPDATE}" = "0" ]]; then APT_UPDATE=1; sudo apt update; fi;
  sudo apt-get install -y libssl-dev;
fi


if [[ "$( sudo systemctl status mongod >/dev/null | grep -c 'Loaded: not-found' )" -gt "0" ]]; then

  echo "Installing 'mongodb'";

	sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
	echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

  if [[ "${APT_UPDATE}" = "0" ]]; then APT_UPDATE=1; sudo apt update; fi;

	sudo apt-get install -y mongodb-org

fi;

node --version || (

  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash;
	export NVM_DIR="/home/you/.nvm"
	[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
  nvm install 4.6.2;

);

sudo systemctl daemon-reload;
sudo systemctl enable mongod;
sudo systemctl restart mongod;
sudo systemctl status mongod;

pushd programs/server >/dev/null;

  npm install;

popd >/dev/null;

export MONGO_URL=mongodb://localhost:27017/mmks;
export ROOT_URL=http://mmks.planet.sun
export PORT=8080;

export METEOR_SETTINGS=$(cat settings.json);

echo "Ready to start Meteor app";
node main.js;

