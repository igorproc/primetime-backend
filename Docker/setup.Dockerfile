FROM alpine:latest AS prepare-stage

ARG ENVIRONMENT_NAME
ARG BRANCH_NAME

ENV BRANCH_NAME=${BRANCH_NAME}

WORKDIR /app

RUN apk update && apk add --no-cache git

RUN /bin/sh -c "git clone --single-branch --branch $BRANCH_NAME https://github.com/igorproc/primetime-backend.git ."

COPY ../Docker .

RUN /bin/sh -c "find ./Docker/scripts/ -type f -exec chmod +x {} \; && ./scripts/${ENVIRONMENT_NAME}.sh"
