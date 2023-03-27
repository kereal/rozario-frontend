# docker build -t rozario-frontend .
# docker run -dp 3006:3006 --name rozario-frontend rozario-frontend
# docker exec -it rozario-frontend ash


FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod


FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules


ENV PORT 3006
EXPOSE 3006
CMD ["node", "index.js"]
