# Auth API - Node.js, Express & MongoDB

This is a secure and production-ready authentication API built with **Node.js**, **Express**, and **MongoDB**. It features **JWT-based authentication**, **role-based access control**, route protection middleware, and support for CI/CD deployment.

---

## Features

- User registration and login (with JWT)
- Password hashing with bcrypt
- Role-based access (`admin` and `user`)
- Middleware to protect private routes
- MongoDB connection via Local or Atlas/Alternatives
- Environment variable configuration with dotenv
- Express error handling
- CI/CD with GitHub Actions
- API tested using Thunder Client/Postman

---

## Tech Stack

| Tech               | Description                        |
|--------------------|------------------------------------|
| Node.js            | JavaScript runtime                 |
| Express.js         | Web server framework               |
| MongoDB            | NoSQL database                     |
| Mongoose           | ODM for MongoDB                    |
| JWT                | Authentication token               |
| Bcrypt             | Password hashing                   |
| dotenv             | Env config loader                  |
| GitHub Actions     | CI/CD Pipeline                     |
| Thunder Client     | API testing tool                   |

---

##  Getting Started

### 1. Clone the repository
git clone https://github.com/your-username/auth-api.git
cd auth-api

### 2. Install dependencies

npm install

### 3. Create .env file

- PORT=5000
- MONGO_URI=mongodb://localhost:27017/authDB
- JWT_SECRET=yourSuperSecretKey

### 4. Run the server
npm run dev

---


