FROM lkwg82/h2o-http2-server:latest
MAINTAINER uhyo

COPY build/server/h2o.conf.yml /etc/h2o/h2o.conf
COPY dist/ /etc/h2o/
VOLUME /var/www

