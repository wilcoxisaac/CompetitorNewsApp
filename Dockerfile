# Stage 1: Build the Expo web app
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Accept API keys as build args (optional - app uses mock data without them)
ARG EXPO_PUBLIC_CURRENTS_API_KEY
ARG EXPO_PUBLIC_OPENAI_API_KEY
ENV EXPO_PUBLIC_CURRENTS_API_KEY=$EXPO_PUBLIC_CURRENTS_API_KEY
ENV EXPO_PUBLIC_OPENAI_API_KEY=$EXPO_PUBLIC_OPENAI_API_KEY

# Build the web app
RUN npx expo export --platform web

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy the built web app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
