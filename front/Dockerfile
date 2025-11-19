# Imagem base Node para build
FROM node:20-alpine AS build


WORKDIR /app

COPY package.json ./
COPY . .

RUN npm install

RUN npm run build

# Serve o build com um servidor HTTP estático
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
