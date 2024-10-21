FROM mysql:latest

# Дополнительные параметры конфигурации MySQL
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${MYSQL_DATABASE}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}

# Перемещение дополнительного файла конфигурации MySQL внутрь контейнера
COPY /Docker/mysql/default.conf /etc/mysql/my.cnf

RUN /bin/sh -c "echo $PWD"
