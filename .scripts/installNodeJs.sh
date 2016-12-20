declare NOCOMMAND="command not found";
function installNodeJs()
{

  echo "### Checking NodeJS installation...";
  declare NODEVERSION=$(node --version 2>&1 >/dev/null) >/dev/null;
  if [[ "${NODEVERSION#*$NOCOMMAND}" != "$NODEVERSION" ]]; then

    echo "### Installing Npm and NodeJS";

    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get install -y nodejs;


  fi

  mkdir -p ~/.npm-global;

  touch ~/.profile;
  if [[ "$(cat ~/.profile | grep -c ".npm-global")" < "1" ]]; then
     echo -e "export PATH=~/.npm-global/bin:\$PATH\n" >> ~/.profile
  fi;
  source ~/.profile;

  npm config set prefix '~/.npm-global';

  echo "### Npm and NodeJS installed ";

}
