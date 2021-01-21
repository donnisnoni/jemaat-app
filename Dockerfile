FROM node:12

LABEL maintainer="Don Alfons Nisnoni <donalfonsnnisnoni@gmail.com>"
LABEL version="1.0"

WORKDIR /opt/jemaat-app
COPY ./ ./  
RUN yarn
EXPOSE 8080
CMD [ "node", "server/server.js" ]
