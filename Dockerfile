# Use the official Node.js v20 image as the base image
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of the project files to the working directory
COPY . .

# Build the project
RUN yarn build

# Expose the port that the application will be running on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]