FROM node:latest

WORKDIR /app

COPY package*.json ./

# Install Dependencies

RUN npm install --production

# Copy Remaining Files
COPY . .

# Export PORT
EXPOSE 4000

# Start App
CMD [ "npm", "start" ]