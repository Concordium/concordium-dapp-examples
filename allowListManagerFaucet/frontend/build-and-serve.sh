#!/bin/bash
set -e

echo "Building application with runtime environment variables..."
echo "TOKEN_ID: ${TOKEN_ID}"
echo "BACKEND_URL: ${BACKEND_URL}"

# Build the application with runtime environment variables
npm run build

echo "Build completed.Starting server..."

# Serve the built application
serve -s dist -l 3000