# Multi-stage Dockerfile for StorMate Node.js Backend Server
FROM node:20-alpine

WORKDIR /app

# Copy package descriptors and install dependencies
COPY server/package*.json ./
RUN npm ci --only=production

# Copy application source code
COPY server/ ./

# Expose backend API port
EXPOSE 5713

# Start server
CMD ["node", "index.js"]
