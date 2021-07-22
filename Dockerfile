FROM node

MAINTAINER github.com/ek2061

RUN apt-get update
RUN apt-get -y install git
RUN git clone https://github.com/ek2061/lab-fund-web.git

WORKDIR /lab-fund-web
RUN npm install
RUN npm install -g serve
EXPOSE 5001
CMD npm run build && serve -s dist/
