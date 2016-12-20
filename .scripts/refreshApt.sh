declare FLAG="/tmp/updatedApt";
set -e;
function refreshApt()
{
  if [[ -f ${FLAG} ]]; then
    declare -i LAPSE=$(expr $(date +%s) - $(date +%s -r /tmp/updatedApt ));
    if (( LAPSE < 90000 )); then
      echo "### APT is up to date.";
      return;
    fi;
  fi

  echo "### Update APT";
  sudo apt-get -y update && \
  sudo apt-get -y upgrade && \
  sudo apt-get -y dist-upgrade && \
  sudo apt-get -y clean && \
  sudo apt-get -y autoremove;

  sudo apt-get -y install curl git jq;
  sudo apt-get -y install build-essential g++;

  touch ${FLAG};
  
  if ! grep "fs.inotify.max_user_watches=524288" /etc/sysctl.conf; then
    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p >/dev/null;
  else
    echo -e "Done already.";
  fi;

  echo "### APT Updated";
}
