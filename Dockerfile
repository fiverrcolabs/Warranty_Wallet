# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install dependencies
RUN cd client && npm i --force
RUN cd server && npm i


# Copy the rest of the app to /app
COPY . .

# Set environment variables
ENV NODE_ENV production

# Run the app
CMD ["npm", "run", "server"]
