# Use the official Node.js 20 slim image
FROM node:20-slim

# Install Chromium and dependencies required for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libpangocairo-1.0-0 \
    libpangoft2-1.0-0 \
    libjpeg-dev \
    libx11-6 \
    libxext6 \
    libxfixes3 \
    libxrender1 \
    libxrandr2 \
    libxcursor1 \
    libxi6 \
    libxcomposite1 \
    libxdamage1 \
    libxinerama1 \
    libgles2 \
    wget \
    ca-certificates \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set Puppeteer's executable path to Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the application code
COPY . .

# Expose the port for the Node.js server
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
