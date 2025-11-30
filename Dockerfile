# build stage
FROM node:16-alpine AS build
WORKDIR /app
# copy package files first (cache)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps
# copy rest
COPY . .
# ensure .env is included (workflow creates it before docker build)
COPY .env .env
RUN npm run build

# production stage
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
