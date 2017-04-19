#!/usr/bin/env bash
#
source ./meteor-mantra-kickstarter/clean_all.sh;

pushd ./meteor-mantra-kickstarter >/dev/null;
  CleanAllInstalledPackages;
popd >/dev/null;
