FROM mongo

RUN apt-get update && apt-get install -y python3 inetutils-ping

COPY wait-for-hosts-to-finish.py /tmp/
COPY start.sh /bin

RUN chmod +x /bin/start.sh

ENTRYPOINT start.sh