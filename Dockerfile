FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --logLevel error


FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules


ENV PORT 3006
EXPOSE 3006
CMD ["node", "index.js"]
