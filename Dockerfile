# 1. Use the official lightweight Node.js runtime
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package configuration files first (for efficient Docker caching)
COPY package*.json ./

# 4. Install production dependencies only
RUN npm ci --only=production

# 5. Copy the rest of your application code (including src/ and app.js)
COPY . .

# 6. Expose the port your backend runs on
EXPOSE 5000

# 7. Start the application using your main app.js file
CMD ["node", "app.js"]
