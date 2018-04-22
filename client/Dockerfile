FROM node:8.9.1 as client-builder
LABEL "author"="Sing Le" \
      "version"="0.0.1" \
      "description"="Frontend image for Asset Tracking"

WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install

COPY public /usr/src/app/public
COPY src /usr/src/app/src
RUN npm run build

FROM nginx:1.13.0

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=client-builder /usr/src/app/build /var/www
COPY docker/default.conf /etc/nginx/conf.d
COPY docker/entrypoint.sh /

RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]