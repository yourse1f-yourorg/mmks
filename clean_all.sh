#!/usr/bin/env bash
#
source ./meteor-mantra-kickstarter/clean_all.sh;

pushd ./meteor-mantra-kickstarter >/dev/null;
  CleanAllInstalledPackages;
  sed -i '/^ *\"mmks[a-zA-Z0-9_]*\": *\"/d' package.json;
popd >/dev/null;
