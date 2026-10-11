#!/bin/bash
set -e

# Bind Apache dynamically to $PORT (Render sets PORT=10000 by default, fallback to 80)
PORT="${PORT:-80}"
echo "Configuring Apache to listen on port ${PORT}..."
sed -i "s/Listen [0-9]*/Listen ${PORT}/g" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:[0-9]*>/<VirtualHost \*:${PORT}>/g" /etc/apache2/sites-available/*.conf

# Run database migrations in background on container startup so Apache starts immediately
if [ -n "$DATABASE_URL" ] || [ -n "$DB_URL" ] || [ -n "$DB_HOST" ]; then
    echo "Running database migrations in background..."
    php artisan migrate --force || true &
fi

# Execute main process
exec apache2-foreground
