FROM node:8.12

RUN apt-get update && apt-get install -y python3 inetutils-ping

COPY wait-for-hosts-to-finish.py /tmp

COPY . /tmp/app
WORKDIR /tmp/app

RUN npm install && npm run build

ENTRYPOINT python3 /tmp/wait-for-hosts-to-finish.py xkcd1 && node /tmp/app/dist/index.js ${DIFF_ARGS}