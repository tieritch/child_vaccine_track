# Child Vaccine Track

**Child Vaccine Track** is a **Node.js / Express** application providing a **GraphQL API** for tracking child vaccinations.  
It enables management of children, vaccines, vaccination records, and system users, with **role-based access control (RBAC)** for secure and scalable permissions management.  
The database schema is handled through **Knex migrations** and **Objection.js models** backed by **PostgreSQL**.

---

## 🚀 Key Features
- **Children Management**: add, update, delete, and list children.  
- **Vaccines Management**: maintain a catalog of available vaccines.  
- **Vaccination Records**: track which child received which vaccine, when, and where.  
- **User Management & Authentication**: register, authenticate, and manage users.  
- **Role-Based Access Control (RBAC)**: enforce permissions depending on user roles (e.g., admin, healthcare worker, parent).  
- **GraphQL API**: flexible queries and mutations for accessing and manipulating data.  
- **Validation**: input validation using **Joi**.  
- **Caching/Session**: optional **Redis** integration.  

---

## 🛠️ Tech Stack
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)  
- [GraphQL](https://graphql.org/) (schema and resolvers)  
- [Knex.js](http://knexjs.org/) & [Objection.js](https://vincit.github.io/objection.js/) for database queries and models  
- [PostgreSQL](https://www.postgresql.org/) as the relational database  
- [Joi](https://joi.dev/) for validation  
- [Redis](https://redis.io/) (optional)  
- **RBAC** (Role-Based Access Control)  

---

## 📂 Project Structure
├── index.js # Server entry point
├── graphql-schema/ # GraphQL type definitions
├── resolvers/ # GraphQL resolvers
├── models/ # Objection.js models
├── migrations/ # Knex migrations for PostgreSQL
├── joi-schema/ # Joi validation schemas
├── redis-client.js # Redis client (if used)
└── package.json


---

## ⚙️ Setup

1. **Clone the repository**
```bash
git clone https://github.com/tieritch/child_vaccine_track.git
cd child_vaccine_track

2. Install dependencies
npm install

3. Configure environment variables
Create a .env file at the root:
PORT=8000
HOST="localhost"
DB_NAME="child_vaccine_data"
DB_PASSWORD="000"
USER_NAME="postgres"
ADMIN_PASS="admin" # password of first user created while running migration
ACCESS_TOKEN_SECRET="access_secret"
REFRESH_TOKEN_SECRET="refress_secret"
NODE_ENV="development"

4. Run database migrations
npx knex migrate:latest

5. Start the server
 npm run dev
The GraphQL API will be available at: http://localhost:8500/graphql

Role-Based Access Control (RBAC)

The system implements RBAC to manage access:
Admin: full permissions to manage users, children, vaccines, and records.
Healthcare Worker: can manage children and vaccination records.
An admin can create roles, assign permissions to those roles, and decide which users to grant them to.
This ensures proper security and data privacy across the platform.

Database

The database schema is defined via Knex migrations (/migrations).
Objection.js models represent entities and define relationships (e.g., User, Child, Vaccine, ChildVaccination).
Run migrations whenever setting up or updating the database.


License

This project is released under the MIT License (or specify your chosen license).

