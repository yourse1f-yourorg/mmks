function install_local_packages() {
  echo -e "### Installing included npm packages for Meteor";

  mkdir -p node_modules;
  pushd node_modules >/dev/null;

    for dir in ../.pkgs/*/
    do
      echo -e "~~~~~~~~~~  Installing and Linking '${dir}'   ~~~~~~~~~~~~~~~~~~~~~~~~~~~";
      meteor npm link ${dir};
    done

    echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

  popd >/dev/null;
}

install_local_packages;
