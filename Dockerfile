# ---------- BUILD STAGE ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first for caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all code
COPY . .

# Build react app
RUN npm run build

# ---------- PRODUCTION STAGE ----------
FROM nginx:stable-alpine

# Clear default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built react app
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
