# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the app to /app
COPY . .

# Set environment variables
ENV NODE_ENV production

# Build the app
RUN npm run build



# Run the app
CMD ["npm", "run", "dev"]
