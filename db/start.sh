#!/usr/bin/env bash
docker-entrypoint.sh mongod &
python3 /tmp/wait-for-hosts-to-finish.py ${WAIT_HOSTS_FINISH} && mongod --shutdown
