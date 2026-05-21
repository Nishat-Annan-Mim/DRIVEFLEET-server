# DriveFleet - Server

🚀 Live Server: https://drivefleet-server-b3e1.onrender.com

## About

This is the backend REST API for DriveFleet, a full-stack car rental platform. Built with Node.js, Express, and MongoDB.

## Features

- 🔐 **JWT Authentication** — Secure token generation stored in HTTPOnly cookies with 7 day expiry.
- 🚘 **Car Management API** — Full CRUD operations for car listings with owner-based access control.
- 📋 **Booking System** — Create, view, and cancel bookings with automatic booking count increment.
- 🛡️ **Protected Routes** — Private API endpoints verified with JWT middleware.
- 🔍 **Search & Filter** — Search cars by name using MongoDB regex operator and filter by car type.

## API Endpoints

### Auth
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login and receive JWT cookie
- `POST /api/auth/logout` — Clear JWT cookie

### Cars
- `GET /api/cars` — Get all cars (supports search and type filter)
- `GET /api/cars/:id` — Get single car details
- `GET /api/cars/my-cars` — Get logged in user's cars (private)
- `POST /api/cars` — Add new car listing (private)
- `PUT /api/cars/:id` — Update car listing (private, owner only)
- `DELETE /api/cars/:id` — Delete car listing (private, owner only)

### Bookings
- `POST /api/boo
