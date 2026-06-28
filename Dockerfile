# Step 1: Specify the base image
# FROM node:20-alpine pulls a lightweight Linux image pre-configured with Node.js 20 and npm.
# Alpine is selected to minimize image size while providing a stable execution runtime.
FROM node:20-alpine

# Step 2: Set the working directory inside the container
# WORKDIR /app creates a directory named '/app' and sets it as the active directory
# for any subsequent COPY, RUN, or CMD instructions.
WORKDIR /app

# Step 3: Copy package manager lockfiles to the workspace
# COPY package.json package-lock.json ./ copies the dependencies definitions first.
# This is isolated from copying source code to leverage Docker's layer caching mechanism.
COPY package.json package-lock.json ./

# Step 4: Install dependencies
# RUN npm install installs all dependencies inside the container's node_modules directory,
# including Vite and other development tooling.
RUN npm install

# Step 5: Copy the rest of the project codebase
# COPY . . copies all files from the host repository into the container's '/app' directory.
# Note: node_modules and dist will be ignored if defined in a .dockerignore file.
COPY . .

# Step 6: Document the port mapping
# EXPOSE 5173 indicates that the container listens on port 5173 at runtime.
# This serves as documentation for developers and container platforms.
EXPOSE 5173

# Step 7: Define the startup execution command
# CMD ["npm", "run", "dev"] starts the Vite development server in watch mode.
CMD ["npm", "run", "dev"]
