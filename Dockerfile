# Step 1: Use official Node.js LTS image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files first
COPY app/package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy app source code
COPY app/ .

# Step 6: Expose port 8080
EXPOSE 8080

# Step 7: Start the Node server
CMD ["node", "server.js"]
