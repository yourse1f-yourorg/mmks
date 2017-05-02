#!/usr/bin/env bash
#
source ./meteor-mantra-kickstarter/clean_all.sh;

pushd ./meteor-mantra-kickstarter >/dev/null;
  rm -fr .pkgs/gitignored_*;
  CleanAllInstalledPackages;
popd >/dev/null;

rm -fr ~/.meteor/packages/meteor-tool/1.4.4_1/mt-os.linux.x86_64/dev_bundle/lib/node_modules/mmks_*;
