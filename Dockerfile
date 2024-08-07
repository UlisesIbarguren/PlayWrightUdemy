FROM mcr.microsoft.com/playwright:v1.45.3-jammy

# Create app directory
RUN mkdir /app
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . /app/

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install Playwright browsers
RUN npx playwright install

# Expose the port Angular will run on
EXPOSE 4200

# Start Angular server and run Playwright tests
CMD ["sh", "-c", "npm start & npx playwright test"]
