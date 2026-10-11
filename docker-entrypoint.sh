#!/bin/bash
set -e

# Run database migrations on container startup
if [ -n "$DATABASE_URL" ] || [ -n "$DB_URL" ] || [ -n "$DB_HOST" ]; then
    echo "Running database migrations..."
    php artisan migrate --force || true
fi

# Execute main process
exec apache2-foreground
