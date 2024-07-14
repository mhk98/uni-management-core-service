# # Use the official Node.js image as the base image
# FROM node:22-alpine

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./


# # Copy the rest of the application code to the working directory
# COPY . .

# # Install dependencies
# RUN npm install --frozen-lockfile

# # Copy the example environment file to .env
# COPY .env.example .env

# # Install dependencies
# RUN npm install --frozen-lockfile

# # Make sure the entrypoint script is executable
# RUN chmod +x ./entrypoint.sh

# # Expose the port your app runs on
# EXPOSE 5000

# # Command to run the application
# ENTRYPOINT ["sh", "./entrypoint.sh"]


FROM node:22-alpine
WORKDIR /src/app
COPY . .
RUN npm install
COPY .env.example .env
RUN npm run build
EXPOSE 5000
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ["sh", "./entrypoint.sh"]