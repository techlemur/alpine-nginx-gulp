FROM node:23-alpine3.20


RUN mkdir /workbench && \
	cd /workbench && \
	apk update && \
	apk add nginx openssl&& \
	mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig

WORKDIR /workbench

COPY nginx.conf /etc/nginx/nginx.conf
COPY gulpfile.js /etc/gulpfile.js
COPY startgulp.sh /bin/startgulp

run chmod +x /bin/startgulp

RUN	cd /workbench && npm install gulp gulper browser-sync

run mkdir -p /etc/nginx/ssl && openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
-keyout /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt \
-subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=localhost"


ENV SERVERADDRESS 127.0.0.1

# nginx -g 'daemon off;'

EXPOSE 80/tcp
EXPOSE 443/tcp

ENTRYPOINT ["/bin/sh","-c","/usr/sbin/nginx -g 'daemon off;' & npx gulper"]