# Clash of Clans Stats App

A full-stack application to view Clash of Clans data using Spring Boot, MongoDB, and React.

## Prerequisites

- Java 17+
- Maven
- Node.js & npm
- MongoDB (running on localhost:27017)
- Clash of Clans API Token

## Setup

### 1. Configure Backend
1. Open `backend/src/main/resources/application.properties`.
2. Replace `YOUR_API_TOKEN_HERE` with your actual API token from [developer.clashofclans.com](https://developer.clashofclans.com/).

### 2. Run Backend
```bash
cd backend
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`.

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`.

## Features
- **Clan Search**: View clan details, stats, and war log.
- **Player Search**: View player profile, trophies, and town hall level.
- **Caching**: Data is cached in MongoDB to reduce API calls.
