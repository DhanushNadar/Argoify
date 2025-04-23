FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./ 
RUN npm install 

COPY . .

RUN npm test

FROM node:18-slim

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000

CMD ["node", "index.js"]
