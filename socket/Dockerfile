FROM node:12.18.2-alpine3.12
WORKDIR /app
COPY ./package.json ./package.json
RUN yarn
COPY ./ ./
RUN yarn build
EXPOSE 5000
CMD ["node", "build/main.js"]