# 1️⃣ Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy rest of the project
COPY . .

# Build the project
RUN npm run build

# 2️⃣ NGINX Stage
FROM nginx:stable-alpine

# Copy build output to nginx html folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
