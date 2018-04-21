FROM node:8.9.1
LABEL "author"="Sing Le" \
      "version"="0.0.1" \
      "description"="Backend image for Asset Tracking"

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/

RUN npm install

COPY src /usr/src/app

ENV PORT 8080
EXPOSE 8080

CMD [ "npm", "start" ]