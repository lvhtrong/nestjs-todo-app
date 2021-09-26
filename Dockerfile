FROM node:14.17-alpine3.14 As builder
WORKDIR /usr/src/app
COPY . .
RUN npm i --ignore-scripts
RUN npx nest build

FROM node:14.17-alpine3.14

ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ormconfig.* .env* ./
RUN npm i --only=prod --ignore-scripts
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/migrations ./migrations

CMD node dist/src/main
