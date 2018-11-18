FROM node:8
MAINTAINER giseop.lee <llgs901@naver.com>

RUN mkdir -p /app/admin

COPY package.json /app/admin/package.json
RUN  cd /app/admin; npm install

COPY . /app/admin

RUN echo 'node version : ' && node --version
RUN echo 'npm  version : ' &&  npm --version

WORKDIR /app/admin

CMD npm run start

EXPOSE 9090
