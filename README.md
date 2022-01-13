# Storefront Backend Project

## Getting Started

### Installation

- npm install or yarn
- connect to psql

```bash
psql -U postgres
```

- CREATE USER fullstack WITH PASSWORD 'password123'
- and create database storefront and storefront_test

```bash
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```

### Migration

- run db-migrate up

### ENV Variables

- add env variables to your .env file

```
HOST = localhost
DB= storefront
USER= fullstack
PASSWORD= password123
DB_TEST = storefront_test
NODE_ENV=dev
BCRYPT_PASSWORD=store_front_password
SALT_ROUNDS=10
TOKEN_SECRET=SECrEt

```

### Run app

```
npm run watch
```

### Testing

```
npm run test
```

### Notes

- /seed endpoint is just for testing purpose only
