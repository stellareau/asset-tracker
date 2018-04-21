#!/bin/bash

clean() {
  echo "Removing old images"
  docker rm -f client server
}

build() {
  echo "Building images"
  docker build -t asset-client client/.
  docker build -t asset-server server/.
}

run() {
  echo "Running images"
  docker run -d --name server -p 8080:8080 --net asset --restart unless-stopped asset-server:latest
  docker run -d --name client -p 80:80 --net asset --restart unless-stopped asset-client:latest

  echo "Running reverse proxy"
  # TODO: Add reverse proxy
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
	*)
    clean
    run
		build
		;;
esac

echo "All done!"