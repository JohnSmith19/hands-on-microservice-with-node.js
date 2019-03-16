FROM node
MAINTAINER John Smith

ADD imagini/app.js /opt/app/app.js
ADD imagini/package.json /opt/app/package.json
ADD imagini/settings.json /opt/app/settings.json

WORKDIR /opt/app 
RUN yarn install

EXPOSE 3000

CMD ["node", "/opt/app/app"]