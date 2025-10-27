# Use nginx stable alpine image
FROM nginx:stable-alpine

# Remove default nginx html and copy our site
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx (default command in base image is fine)
# Healthcheck (optional) - checks index.html is served
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD wget -q --spider http://localhost/ || exit 1
