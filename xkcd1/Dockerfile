FROM node:8.12

COPY . /tmp/app
WORKDIR /tmp/app

RUN npm install && npm run build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

ENTRYPOINT /wait && node /tmp/app/dist/index.js ${CLI_ARGS} --db-name=${DB_NAME}