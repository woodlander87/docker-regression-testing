import os

import sys
import time

hosts = sys.argv[1:]
seen = {}

print('Waiting for [' + ', '.join(hosts) + '] to finish')
sys.stdout.flush()

for host in hosts:
    seen[host] = False

while True:
    for host in hosts:
        is_reachable = os.system('ping -c 1 -W 1 ' + host + ' > /dev/null 2>&1') == 0
        if not seen[host] and is_reachable:
            seen[host] = True
            print('host [' + host + '] is reachable')
        elif seen[host] and not is_reachable:
            hosts.remove(host)
            print('host [' + host + '] exited')

    if len(hosts) == 0:
        break
    time.sleep(1)

print('Finished waiting for hosts to finish.')
sys.stdout.flush()
