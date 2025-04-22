# Facial Data Collection Website

## Setup Instructions

1. **Prerequisites**:
   - Node.js (v16+)
   - MongoDB (local or MongoDB Atlas)
   - Git

2. **Clone Repository**:
   ```bash
   git clone <repository-url>
   cd facial-data-collection
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Configure Environment**:
   - Create a `server/.env` file:
     ```env
     PORT=3001
     MONGO_URI=mongodb://localhost:27017/facial-data-collection
     ```

5. **Run MongoDB**:
   - Start MongoDB locally or use MongoDB Atlas.

6. **Start Server**:
   ```bash
   npm start
   ```

7. **Serve Frontend**:
   - Place `client/facial-data-collection-app.html` in a static server:
     ```bash
     npx http-server client -p 3000
     ```
   - Access at `http://localhost:3000`.

8. **Access Application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:3001`

## Notes
- Ensure MongoDB is running before starting the server.
- Images and JSON files are stored in `server/Uploads/images/`.
- For production, consider AWS S3 for file storage and add JWT authentication.