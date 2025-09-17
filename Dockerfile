FROM public.ecr.aws/lambda/nodejs:22

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . ./

# Build the application
RUN npm run build

# Remove dev dependencies after build to reduce image size
RUN npm prune --omit=dev

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "dist/lambda.handler" ]
