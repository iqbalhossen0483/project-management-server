# ---------- Build Stage ----------
FROM node:20-alpine AS builder

# Set workdir
WORKDIR /usr/dev/app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build project (assumes tsc outputs to dist/)
RUN npm run build


# ---------- Production Stage ----------
FROM node:20-alpine

WORKDIR /usr/pro/app

# Copy only necessary files from builder
COPY --from=builder /usr/dev/app/package*.json ./
COPY --from=builder /usr/dev/app/node_modules ./node_modules
COPY --from=builder /usr/dev/app/dist ./dist

# Add a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose port
EXPOSE 5000

# Run app
CMD ["node", "dist/server.js"]
