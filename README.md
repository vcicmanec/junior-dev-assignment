# Project Name

A modern web application built with Vue 3and TypeScript, featuring a card-based board interface with state management using Pinia and backend using NestJS.

## 🚀 Tech Stack

### Frontend Frameworks
- **Vue 3.5.22** - Progressive JavaScript framework
- **React 19.2.0** - JavaScript library for building user interfaces
- **TypeScript 5.7.3** - Typed superset of JavaScript

### State Management & Routing
- **Pinia 3.0.4** - Vue state management
- **Vue Router 4.6.3** - Official router for Vue.js

### Styling
- **Bootstrap 5.3.8** - CSS framework for responsive design

### Backend
- **NestJS** - Node.js framework for building efficient server-side applications
- **Joi** - Data validation library
- **Reflect Metadata** - Metadata reflection API
- **PostgreSQL** - Relational database management system
- **TypeORM** - Object-relational mapper for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana, WebSQL databases.
- **pg-mem** - In-memory PostgreSQL database for testing

### Development Tools
- **Vite 7.1.11** - Next generation frontend build tool
- **ESLint 9.18.0** - JavaScript/TypeScript linter
- **Prettier 3.4.2** - Code formatter
- **Turbo 2.6.0** - High-performance build system

### Testing
- **Jest 30.0.0** - JavaScript testing framework
- **Vitest 3.2.4** - Vite-native unit test framework
- **Vue Test Utils 2.4.6** - Vue component testing utilities

## 📋 Prerequisites

- **Node.js** (version 22 or higher)
- **pnpm** package manager

## 🛠️ How to run dev locally

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Create `.env` file in the root directory with the contents of the `.env.example` file
4. Spin up the database: `docker-compose up -d db`
5. run `pnpm dev`

## How to run server production build in docker
1. run `docker compose up`