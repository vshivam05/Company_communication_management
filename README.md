# Communication Management System


Access admin features using:
     - User ID: `admin`
     - Password: `admin123`

> **Note:** The backend is deployed on Render's free tier, which may cause initial loading delays on first access. Please be patient as the server spins up.

## Application Flow

### System Flow
1. **Company Management** - Create and manage companies
2. **Communication Methods** - Select communication methods for companies
3. **Log Communication** - Record communication details
4. **Dashboard** - View communication analytics and reports
5. **Notifications** - Get alerts for upcoming and overdue communications


### Admin Module
1. **Admin Login**
   - Access admin features using:
     - User ID: `admin`
     - Password: `admin123`
   - Admin has access to all modules including:
     - Company Management
     - Communication Methods
     - Dashboard
     - Notifications
     - Communication Log

2. **Company Management**
   - Create and manage companies
   - Only accessible to admin users

3. **Communication Methods**
   - Select communication methods for companies
   - Only accessible to admin users

4. **Logout**
   - Always logout when exiting admin module

### User Module
1. **Direct Access**
   - No login required
   - Accessible features:
     - Notifications
     - Log Communication
     - Dashboard

2. **Communication Log**
   - Select communication time
   - Choose communication method for companies

3. **Dashboard**
   - View company list
   - See previous 5 communications
   - View upcoming communications

4. **Notifications**
   - Two sections:
     - Companies with overdue communications
     - Companies with today's/future communications

## Tech Stack

### Frontend
- React.js
- React Router
- Axios for API calls
- tailwind css for styling


### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests

## Deployment
- Frontend deployed on Vercel
- Backend deployed on Render

## Project Structure

### Frontend
```
frontend/
├── public/              # Static assets
├── src/
│   ├── pages/           # Page components
│   ├── assets/          # Images and media
│   ├── App.js           # Main application component
│   └── index.js         # Entry point
```

### Backend
```
backend/
├── controllers/         # Business logic
├── models/              # Database models
├── routes/              # API endpoints
├── middleware/          # Authentication middleware
└── server.js            # Server entry point
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Set up environment variables
4. Start development servers:
   ```bash
   # Frontend
   cd frontend && npm start
   
   # Backend
   cd backend && npm start
   ```

## Environment Variables

### Frontend
```env
REACT_APP_API_URL=http://localhost:5000
```

### Backend
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/communication_db
JWT_SECRET=your_jwt_secret
```

## Features

- Role-based access control
- Real-time notifications
- Communication scheduling
- Company management
- Dashboard analytics
- Responsive design

## API Documentation

### Authentication
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "username": "admin",
    "role": "admin"
  }
}
```

### Companies
```http
GET /api/companies
Authorization: Bearer <token>
```

Response:
```json
[
  {
    "id": "1",
    "name": "Company A",
    "contactEmail": "contact@companya.com",
    "communicationMethods": ["email", "phone"]
  }
]
```

## Contribution Guidelines

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes with clear messages
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request



### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
npm test
```



## Future Roadmap

- [ ] Implement user registration
- [ ] Add email notifications
- [ ] Develop mobile app version
- [ ] Add advanced analytics

