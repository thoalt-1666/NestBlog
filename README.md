# Nest Blog

A blog application built with NestJS and PostgreSQL.

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL 14
- npm or yarn

## Database Setup

1. Install PostgreSQL:
```bash
brew install postgresql@14
```

2. Start PostgreSQL service:
```bash
brew services start postgresql@14
```

3. Create database and user:
```bash
createdb nest_blog
createuser -s postgres
psql -d nest_blog -c "ALTER USER postgres WITH PASSWORD 'postgres';"
```

4. Verify database connection:
```bash
psql -U postgres -d nest_blog
```

## Project Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create .env file in the root directory with the following content:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nest_blog
```

3. Run migrations:
```bash
npm run migration:run
# or
yarn migration:run
```

4. Start the development server:
```bash
npm run start:dev
# or
yarn start:dev
```

The application will be available at http://localhost:3000
