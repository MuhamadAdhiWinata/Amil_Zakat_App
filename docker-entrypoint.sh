#!/bin/sh
set -e

echo "Running startup initialization..."
node /app/scripts/startup.mjs

echo "Starting application..."
exec "$@"
