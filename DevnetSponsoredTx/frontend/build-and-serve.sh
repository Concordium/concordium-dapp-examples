#!/bin/sh
set -e

echo "=== Sponsored Transactions Demo - Runtime Configuration ==="

# Create a backup of the original index.html if it doesn't exist
if [ ! -f "dist/index.html.template" ]; then
    cp dist/index.html dist/index.html.template
else
    cp dist/index.html.template dist/index.html
fi

echo "Injecting runtime environment variables..."
echo "BACKEND_URL: ${BACKEND_URL:-http://localhost:3002}"
echo "TOKEN_ID: ${TOKEN_ID:-EURtest}"
echo "TOKEN_DECIMALS: ${TOKEN_DECIMALS:-6}"
echo "CCDSCAN_URL: ${CCDSCAN_URL}"

sed -i "s|__BACKEND_URL__|${BACKEND_URL:-http://localhost:3002}|g" dist/index.html
sed -i "s|__TOKEN_ID__|${TOKEN_ID:-EURtest}|g" dist/index.html
sed -i "s|__TOKEN_DECIMALS__|${TOKEN_DECIMALS:-6}|g" dist/index.html
sed -i "s|__CCDSCAN_URL__|${CCDSCAN_URL}|g" dist/index.html

echo "Runtime configuration injected."
echo "Starting server on port 3000..."

serve -s dist -l 3000
