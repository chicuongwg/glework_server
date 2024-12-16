# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install -g pm2 && npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Run application
CMD ["pm2-runtime", "start", "process.json", "--env", "development"]
