#!/usr/bin/env bash
# File: build.sh
set -e

echo "Meng-install dependencies PHP..."
composer install --no-dev --optimize-autoloader

echo "Meng-install dependencies Node.js..."
npm install

echo "Mem-build assets (Vite)..."
npm run build

echo "Membersihkan cache..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo "Menjalankan migrasi database..."
php artisan migrate --force
