FROM alpine:latest AS prepare-stage

ARG ENVIRONMENT_NAME
ARG BRANCH_NAME

ENV BRANCH_NAME=${BRANCH_NAME}

WORKDIR /app

RUN apk update && apk add --no-cache git

RUN /bin/sh -c "git clone --single-branch --branch $BRANCH_NAME https://github.com/igorproc/primetime-backend.git ."

COPY .. .

FROM node:18.16.1

ARG ENVIRONMENT_NAME

ENV ENVIRONMENT_NAME=${ENVIRONMENT_NAME}

COPY --from=prepare-stage /app /app

WORKDIR /app

RUN /bin/sh -c "cp ./Docker/environments/.${ENVIRONMENT_NAME}.env .env"

RUN npm ci

COPY .. .

RUN /bin/sh -c "find ./Docker/scripts/ -type f -exec chmod +x {} \; && ./Docker/scripts/${ENVIRONMENT_NAME}.sh"

EXPOSE 3000

SHELL ["bash", "-c"]

CMD npm run start:production
