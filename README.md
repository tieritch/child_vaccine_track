# Child Vaccine Track

**Child Vaccine Track** is a **Node.js / Express** application providing a **GraphQL API** for tracking child vaccinations.  
It enables management of children, vaccines, vaccination records, and system users, with **role-based access control (RBAC)** for secure and scalable permissions management.  
The database schema is handled through **Knex migrations** and **Objection.js models** backed by **PostgreSQL**.

---

## 🚀 Key Features
- Children Management: add, update, delete, and list children.
- Vaccines Management: maintain a catalog of available vaccines.
- Vaccination Records: track which child received which vaccine, when, and where.
- User Management & Authentication: register, authenticate, and manage users.
- Role-Based Access Control (RBAC): enforce permissions depending on user roles (e.g., admin, healthcare worker, parent).
- GraphQL API: flexible queries and mutations for accessing and manipulating data.
- Validation: input validation using Joi.
- Caching/Session: optional Redis integration.

---

## 🛠️ Tech Stack
- Node.js & Express.js
- GraphQL (schema and resolvers)
- Knex.js & Objection.js for database queries and models
- PostgreSQL as the relational database
- Joi for validation
- Redis (optional)
- Role-Based Access Control (RBAC)

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

### 1. Clone the repository
```bash
git clone https://github.com/tieritch/child_vaccine_track.git
cd child_vaccine_track








