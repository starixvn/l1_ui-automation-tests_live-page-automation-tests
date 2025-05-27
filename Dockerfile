FROM hub.lumigame.com/base/playwright:v1.44.0-focal

# Install Playwright browsers and dependencies
RUN npx playwright install chrome
