#  Internship API

Modular backend API built with **Node.js, Express, TypeScript, and PostgreSQL**.

---

##  Overview

A production-style backend system for managing:

- Candidates  
- Applications  
- Positions  
- Authentication (JWT)  

Includes real-world business logic like **auto-closing positions when capacity is reached**.

---

##  Key Features

-  JWT authentication (login/register)
-  Candidate management
-  Application tracking + notes
-  Position management (auto-close logic)
-  Modular architecture (feature-based)
-  Unit testing with Jest

---

##  Architecture

- Clear separation of concerns  
- Business logic handled in services  
- Scalable, maintainable structure  

---

##  Tech Stack

- Node.js  
- Express  
- TypeScript  
- PostgreSQL (`pg`)  
- JWT (`jsonwebtoken`)  
- Bcrypt  
- Jest  

---

##  Auth Flow

1. User logs in → receives JWT  
2. Token sent via header:
3. Middleware verifies token → grants access  

---

##  Core Endpoints
POST /api/auth/register
POST /api/auth/login

POST /api/candidates
GET /api/candidates

POST /api/applications
GET /api/applications

POST /api/positions (Protected)
GET /api/positions

## SETUP
git clone <https://github.com/atenidkoye/Intern_api>
cd internship-api
npm install

# Create .env 
DATABASE_URL=your_db_url
JWT_SECRET=your_secret

# Run
npm run dev
npm test