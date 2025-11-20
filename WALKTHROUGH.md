# Walkthrough: Clash of Clans Integration

I have built a full-stack application to integrate with the Clash of Clans API.

## Architecture

### Backend (Spring Boot)
- **Controller**: `ClashController` exposes REST endpoints.
- **Service**: `ClashOfClansService` handles API communication using `WebClient`.
- **Database**: `CachedDataRepository` stores fetched data in MongoDB.
- **Config**: `WebClientConfig` sets up the API token header.

### Frontend (React)
- **UI**: Built with React and styled with custom CSS for a premium "Clash" look.
- **API**: `api.js` handles communication with the Spring Boot backend.
- **Components**: `ClanInfo` and `PlayerProfile` display the data.

## How to Run

1.  **Database**: Ensure MongoDB is running.
2.  **Backend**:
    - Update `backend/src/main/resources/application.properties` with your API Token.
    - Run `mvn spring-boot:run` in the `backend` folder.
3.  **Frontend**:
    - Run `npm install` in the `frontend` folder.
    - Run `npm run dev`.
    - Open the URL shown (usually `http://localhost:5173`).

## Verification
- **Home**: Search for clans or players using the toggle.
- **Find Clans**: Use the "Find Clans" link to search for clans by name.
- **Leaderboards**: Check global rankings for Locations and Leagues.
- **Gold Pass**: View the current season's start and end dates.
- **Backend**: Verify that all data fetched is cached in MongoDB.
