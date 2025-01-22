# Stage 1: Build the Vite app
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Verify the build output
RUN ls -al /app/dist

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
# Create and set permissions for the directory
RUN mkdir -p /usr/share/nginx/html && chmod -R 777 /usr/share/nginx/html
# Copy the production build files to Nginx from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
