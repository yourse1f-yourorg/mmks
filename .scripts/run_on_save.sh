#!/bin/sh

WATCH_DIRECTORY=$1;
shift;

EVENT_TASK=$1;
shift;

IGNORE_PATHS="$@";

while true #run indefinitely
do
inotifywait -qqr -e close_write,move,create,delete ${IGNORE_PATHS} ${WATCH_DIRECTORY} && ${EVENT_TASK};
done
