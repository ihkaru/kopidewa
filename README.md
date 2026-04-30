# Harga Monorepo

This repository contains both the backend and frontend for the Harga application.

## Structure

- `/backend`: Laravel application
- `/frontend`: Quasar/Vue application

## Getting Started

### Backend
1. `cd backend`
2. `composer install`
3. `cp .env.example .env` (and configure as needed)
4. `php artisan key:generate`
5. `php artisan migrate`

### Frontend
1. `cd frontend`
2. `npm install`
3. `cp .env.example .env` (and configure as needed)
4. `quasar dev` (or `npm run dev`)

## Environment Variables
The `.env.example` files have been updated with all necessary keys. Note that `.env` files are ignored by Git.
