# Stage 1: Build
FROM node:slim AS build

# Install system dependencies and clean up
RUN apt-get update && apt-get install -y libopus-dev && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy only package.json and pnpm-lock.yaml to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install project dependencies (with caching)
RUN pnpm install

# Copy the rest of the project files
COPY . .

# Build the project
RUN pnpm run build

# Stage 2: Runtime
FROM node:slim

# Install runtime dependencies (again, in case they were installed only for the build)
RUN apt-get update && apt-get install -y libopus-dev && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/

# Use a non-root user for security
RUN useradd -m botuser
USER botuser

# Start the bot
CMD ["node", "dist/index.js"]