FROM node:10

ADD . /usr/src/app
WORKDIR /usr/src/app

RUN npm config set loglevel error

RUN npm install webpack@4 pm2 -g --prefer-offline > /dev/null
RUN npm install --prefer-offline > /dev/null

RUN sh ./bin/production_build.sh

CMD ["pm2-runtime", "/usr/src/app/bin/prod.js"]
