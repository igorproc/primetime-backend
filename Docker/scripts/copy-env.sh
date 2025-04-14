#!/bin/sh

# Проверяем наличие аргумента
if [ $# -ne 1 ]; then
    echo "Использование: $0 <ENVIRONMENT_NAME>"
    exit 1
fi

# Получаем значение аргумента
ENVIRONMENT_NAME="$1"
ENVS_PATH="/home/projects/primetime-envs/back"
PROJECT_PATH="/home/projects/primetime-backend-$ENVIRONMENT_NAME"

# Copy Redis ENV
cp $ENVS_PATH/.redis.$ENVIRONMENT_NAME.env $PROJECT_PATH/Docker/environmets/.redis.env
# Copy Mysql ENV
cp $ENVS_PATH/.db.$ENVIRONMENT_NAME.env $PROJECT_PATH/Docker/environmets/.db.env
# Copy App ENV
cp $ENVS_PATH/.app.$ENVIRONMENT_NAME.env $PROJECT_PATH/.env
