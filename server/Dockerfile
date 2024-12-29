# Use a Node.js image
FROM node:16

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Rebuild native modules for the container environment
RUN npm rebuild bcrypt --build-from-source

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
