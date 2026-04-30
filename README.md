# Kopidewa Monorepo

Kolaborasi Pengendalian Inflasi Daerah Kabupaten Mempawah.

This repository contains all applications and services for the Kopidewa project.

## Structure

- `/apps/backend`: Laravel application (API & Admin)
- `/apps/frontend`: Quasar/Vue application (Frontend Dashboard)

## Getting Started

### Backend
1. `cd apps/backend`
2. `composer install`
3. `cp .env.example .env` (and configure as needed)
4. `php artisan key:generate`
5. `php artisan migrate`

### Frontend
1. `cd apps/frontend`
2. `npm install`
3. `cp .env.example .env` (and configure as needed)
4. `quasar dev` (or `npm run dev`)

## Environment Variables
The `.env.example` files have been updated with all necessary keys. Note that `.env` files are ignored by Git.
