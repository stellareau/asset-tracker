#!/bin/bash

clean() {
  echo "Removing old images"
  docker rm -f client server
}

build() {
  echo "Building images"
  docker build -t asset-client client/.
  docker build -t asset-server server/.
  docker build -t local-nginx nginx/.
}

run() {
  echo "Running images"
  docker run -d --name server --net asset --restart unless-stopped asset-server:latest
  docker run -d --name client --net asset --restart unless-stopped asset-client:latest
}

start() {
 echo "Running reverse proxy"
  docker run -d --name nginx -p 443:443 -u 0 --net asset --restart unless-stopped -v /opt:/etc/nginx/certs local-nginx:latest

 echo "Starting mongo"
 docker run -d --name mongo --network asset -v mongodb:/data/db --entrypoint mongod --restart unless-stopped mongo:latest --bind_ip_all
}

case "$1" in
  clean)
    clean
    ;;
	build)
		build
		;;
  run)
    run
    ;;
  start)
    start
    ;;
	*)
    clean
		build
    run
		;;
esac

echo "All done!"