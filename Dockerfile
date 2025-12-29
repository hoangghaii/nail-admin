# ==========================================
# ARGUMENTS (Build-time Configuration)
# ==========================================
ARG NODE_VERSION=24.12.0

# Vite environment variables (required for build)
ARG VITE_USE_MOCK_API=true
ARG VITE_FIREBASE_API_KEY=""
ARG VITE_FIREBASE_AUTH_DOMAIN=""
ARG VITE_FIREBASE_PROJECT_ID=""
ARG VITE_FIREBASE_STORAGE_BUCKET=""
ARG VITE_FIREBASE_MESSAGING_SENDER_ID=""
ARG VITE_FIREBASE_APP_ID=""


# ==========================================
# BASE LAYER (Foundation)
# ==========================================
FROM node:${NODE_VERSION}-alpine AS base

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy package files ONLY for layer caching
COPY package*.json ./


# ==========================================
# DEPENDENCIES LAYER (Shared Cache)
# ==========================================
# This layer is reused by both development and builder stages
# When only source code changes, this layer remains cached
FROM base AS dependencies

# Install ALL dependencies (dev + prod)
# Use BuildKit cache mount for faster installs
RUN --mount=type=cache,target=/root/.npm \
  npm ci && \
  npm cache clean --force


# ==========================================
# DEVELOPMENT LAYER
# ==========================================
FROM dependencies AS development

# Copy application source code
COPY . .

# Expose Vite dev server port
EXPOSE 5174

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# ==========================================
# BUILDER LAYER (Production Build)
# ==========================================
FROM dependencies AS builder

# Copy source code
COPY . .

# Pass Vite env vars to build process
ARG VITE_USE_MOCK_API
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID

ENV VITE_USE_MOCK_API=${VITE_USE_MOCK_API}
ENV VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY}
ENV VITE_FIREBASE_AUTH_DOMAIN=${VITE_FIREBASE_AUTH_DOMAIN}
ENV VITE_FIREBASE_PROJECT_ID=${VITE_FIREBASE_PROJECT_ID}
ENV VITE_FIREBASE_STORAGE_BUCKET=${VITE_FIREBASE_STORAGE_BUCKET}
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=${VITE_FIREBASE_MESSAGING_SENDER_ID}
ENV VITE_FIREBASE_APP_ID=${VITE_FIREBASE_APP_ID}

# Build application
RUN NODE_ENV=production npm run build && \
  npm prune --production && \
  npm cache clean --force && \
  rm -rf \
  src \
  tsconfig*.json \
  vite.config.ts

# ==========================================
# PRODUCTION LAYER (Nginx Runtime)
# ==========================================
FROM nginx:1.27-alpine AS production

# Image metadata (OCI standard labels)
LABEL org.opencontainers.image.title="Pink Nail Admin"
LABEL org.opencontainers.image.description="Admin dashboard for Pink Nail salon"
LABEL org.opencontainers.image.version="0.2.0"
LABEL org.opencontainers.image.vendor="Pink Nail"
LABEL org.opencontainers.image.created="2025-12-27"

# Install dumb-init for proper signal handling in containers
RUN apk add --no-cache dumb-init

# Copy nginx configuration files (as root, before switching user)
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -g 1001 -S nginx-user && \
  adduser -S nginx-user -u 1001 -G nginx-user

# Set ownership and permissions for nginx directories and config files
RUN chown -R nginx-user:nginx-user /usr/share/nginx/html && \
  chown -R nginx-user:nginx-user /var/cache/nginx && \
  chown -R nginx-user:nginx-user /var/log/nginx && \
  chown -R nginx-user:nginx-user /etc/nginx/nginx.conf && \
  chown -R nginx-user:nginx-user /etc/nginx/conf.d && \
  touch /var/run/nginx.pid && \
  chown -R nginx-user:nginx-user /var/run/nginx.pid

# Switch to non-root user (security best practice)
USER nginx-user

# Expose nginx port
EXPOSE 81

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
