FROM mysql:latest

ARG MYSQL_ROOT_PASSWORD
ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD

# Дополнительные параметры конфигурации MySQL
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${MYSQL_DATABASE}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}

# Перемещение дополнительного файла конфигурации MySQL внутрь контейнера
COPY ./mysql/my.cnf /etc/mysql/my.cnf

RUN /bin/sh -c "echo $PWD"
