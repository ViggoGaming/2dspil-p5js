FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy dependencies
COPY package*.json ./

# Install packages
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000, the port that express runs on
EXPOSE 3000
CMD [ "node", "app.js" ]
