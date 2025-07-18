#!/bin/bash
set -e

echo "=== Allow List DApp Runtime Configuration ==="

# Create a backup of the original index.html if it doesn't exist
if [ ! -f "dist/index.html.template" ]; then
    cp dist/index.html dist/index.html.template
else
    # Restore from template to ensure clean replacement
    cp dist/index.html.template dist/index.html
fi

echo "Injecting runtime environment variables..."
echo "TOKEN_ID: ${TOKEN_ID:-EUDemo}"
echo "BACKEND_URL: ${BACKEND_URL:-http://localhost:3001}"
echo "VERIFIER_URL: ${VERIFIER_URL:-http://localhost:8080}"

# Replace placeholders in index.html with actual environment variable values
sed -i "s|__TOKEN_ID__|${TOKEN_ID:-EUDemo}|g" dist/index.html
sed -i "s|__BACKEND_URL__|${BACKEND_URL:-http://localhost:3001}|g" dist/index.html
sed -i "s|__VERIFIER_URL__|${VERIFIER_URL:-http://localhost:8080}|g" dist/index.html

echo "Runtime configuration injected successfully."
echo "Starting server on port 3000..."

# Serve the built application
serve -s dist -l 3000
