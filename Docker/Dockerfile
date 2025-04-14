FROM alpine:latest AS prepare-stage

ARG ENVIRONMENT_NAME
ARG BRANCH_NAME

ENV BRANCH_NAME=${BRANCH_NAME}

WORKDIR /app

COPY .. .

RUN /bin/sh -c "find ./Docker/scripts/ -type f -exec chmod +x {} \;"

FROM node:20.15.0

ARG ENVIRONMENT_NAME

ENV ENVIRONMENT_NAME=${ENVIRONMENT_NAME}

COPY --from=prepare-stage /app /app

WORKDIR /app

RUN npm ci

COPY .. .

RUN /bin/sh -c "./Docker/scripts/copy-env.sh ${ENVIRONMENT_NAME} && ./Docker/scripts/${ENVIRONMENT_NAME}.sh"

EXPOSE 3100

SHELL ["bash", "-c"]

CMD npm run run:deploy:migration
