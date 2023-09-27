# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your Nest.js application will run on (e.g., 3000)
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "start"]


# Use the official Thumbor image
FROM thumbor/thumbor

# Expose the default Thumbor port (e.g., 8888)
EXPOSE 8888
