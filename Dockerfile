FROM php:8.4-apache

# Instal dependensi sistem yang diperlukan
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    nodejs \
    npm

# Bersihkan cache apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instal ekstensi PHP untuk PostgreSQL dan kebutuhan Laravel lainnya
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Aktifkan mod_rewrite Apache untuk URL Laravel (agar routing berfungsi)
RUN a2enmod rewrite

# Ubah DocumentRoot Apache ke folder public/ milik Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Instal Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set direktori kerja
WORKDIR /var/www/html

# Salin semua file proyek ke dalam container
COPY . .

# Instal dependensi PHP menggunakan Composer (hanya untuk production)
RUN composer install --optimize-autoloader --no-dev

# Instal dependensi Node.js & build frontend (Inertia/React/Vite)
RUN npm install --legacy-peer-deps
RUN npm run build

# Beri hak akses ke folder storage dan cache agar Laravel bisa menulis log/session
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Buka port 80
EXPOSE 80
