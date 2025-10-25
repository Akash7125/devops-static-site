# Step 1: Use a lightweight web server image
FROM nginx:alpine

# Step 2: Copy website files into the nginx html directory
COPY . /usr/share/nginx/html

# Step 3: Expose port 80 (web traffic)
EXPOSE 80

# Step 4: Start nginx automatically
CMD ["nginx", "-g", "daemon off;"]
