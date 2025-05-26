FROM hub.lumigame.com/base/playwright:v1.44.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install Playwright browsers and dependencies
RUN npx playwright install --with-deps

# Copy the rest of the application
COPY . .

# Set the default command
CMD ["npm", "run", "test:LivePage"] 