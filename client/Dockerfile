FROM node:12.18.2-alpine3.12
WORKDIR /app
COPY ./package.json ./package.json
RUN yarn
COPY ./ ./
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]