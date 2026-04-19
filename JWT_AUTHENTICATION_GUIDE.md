# JWT Authentication Implementation Guide

## Overview
This project now uses JWT (JSON Web Token) authentication for secure user login and session management. The authentication system includes a backend Express server and a frontend React implementation with context management.

## Architecture

### Backend (Express Server)
- **Location**: `backend/server.js`
- **Port**: 3001 (or configurable via PORT environment variable)
- **Features**:
  - User registration with password hashing (bcryptjs)
  - User login with JWT token generation
  - Token verification endpoint
  - User profile retrieval (protected route)

### Frontend (React)
- **AuthContext**: Manages authentication state globally
- **Login Component**: Updated to use JWT authentication
- **Token Utils**: Utility functions for token management
- **App.jsx**: Wrapped with AuthProvider for context availability

## Getting Started

### 1. Start the Backend Server

```bash
# In the romify directory
npm run server

# Or with a specific port
$env:PORT=3001 ; npm run server  # PowerShell
PORT=3001 npm run server          # Unix/Mac
```

The server will start on `http://localhost:3001` (or on the PORT you specify).

### 2. Start the Frontend Development Server

```bash
# In another terminal, in the romify directory
npm run dev
```

The frontend will start on `http://localhost:5173` (or the configured Vite port).

## Usage

### Login with Email/Password

1. Navigate to the login page (`/login`)
2. Enter your email and password
3. Submit the form
4. On successful login:
   - JWT token is stored in localStorage
   - User data is cached in localStorage
   - User is redirected to home page

### Available Authentication Endpoints

#### Register User
```
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login User
```
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Verify Token
```
POST http://localhost:3001/api/auth/verify
Authorization: Bearer {token}

Response:
{
  "success": true,
  "user": {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Get User Profile (Protected)
```
GET http://localhost:3001/api/auth/profile
Authorization: Bearer {token}

Response:
{
  "success": true,
  "user": {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Using AuthContext in Components

### Example: Check if User is Authenticated

```jsx
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { user, token, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Example: Making Protected API Calls

```jsx
import { useAuth } from "../context/AuthContext";

function UserData() {
  const { token } = useAuth();

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:5000/api/auth/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log(data);
  };

  return <button onClick={fetchUserData}>Fetch User Data</button>;
}
```

## Token Utility Functions

The `src/utils/tokenUtils.js` file provides several utility functions:

```javascript
// Get token from localStorage
const token = getToken();

// Set token in localStorage
setToken(token);

// Remove token
removeToken();

// Check if token is expired
if (isTokenExpired(token)) {
  console.log("Token is expired");
}

// Decode token (client-side only)
const decoded = decodeToken(token);
console.log(decoded); // { id, email, name, exp }

// Check if user is authenticated
if (isAuthenticated()) {
  console.log("User is logged in");
}

// Get time until expiration
const timeLeft = getTokenExpirationTime(token);
console.log(`Token expires in ${timeLeft}ms`);

// Get authorization header
const headers = getAuthHeader(token);
// { Authorization: "Bearer token..." }
```

## Token Storage

Tokens are stored in localStorage with the following keys:
- `authToken`: JWT token
- `authUser`: User data (JSON stringified)

These are cleared when the user logs out or when an invalid/expired token is detected.

## Security Considerations

### Current Implementation
- Passwords are hashed with bcryptjs (10 salt rounds)
- Token expiration set to 7 days
- Tokens are stored in localStorage (consider security implications)

### Recommendations for Production
1. **Store tokens in HTTPOnly cookies** instead of localStorage
2. **Use HTTPS** for all authentication endpoints
3. **Implement refresh tokens** for better security
4. **Add rate limiting** to prevent brute force attacks
5. **Use environment variables** for JWT_SECRET (not hardcoded)
6. **Implement password strength validation**
7. **Add email verification**
8. **Implement password reset functionality**

## Environment Variables

Create a `.env` file in the `backend` directory:

```
JWT_SECRET=your_super_secret_key_here_change_in_production
PORT=5000
```

## Troubleshooting

### "Server is running" but login fails
- Check if backend server is running on port 5000
- Check browser console for CORS errors
- Verify email/password are correct

### Token errors
- Clear localStorage and try logging in again
- Check if token has expired (tokens expire after 7 days)
- Check browser console for error messages

### CORS errors
- Verify backend CORS configuration
- Check if frontend URL is allowed in CORS settings

## Testing Credentials

For testing purposes, you can:
1. Register a new user through the signup page
2. Login with the registered credentials
3. Or use the mock database (add users directly to the `users` Map in server.js)

## Next Steps

1. **Connect to a real database** (MongoDB, PostgreSQL, etc.)
2. **Implement email verification**
3. **Add password reset functionality**
4. **Implement OAuth** (Google, Facebook, etc.)
5. **Add role-based access control**
6. **Implement refresh token rotation**
7. **Add user profile management**
8. **Implement session management**

## File Structure

```
romify/
├── backend/
│   └── server.js (Express server with authentication)
├── src/
│   ├── components/
│   │   └── Login.jsx (Updated with JWT auth)
│   ├── context/
│   │   └── AuthContext.jsx (Authentication context)
│   ├── utils/
│   │   └── tokenUtils.js (Token utility functions)
│   ├── App.jsx (Wrapped with AuthProvider)
│   └── ...
└── package.json (Added jsonwebtoken, bcryptjs)
```

## API Base URL

Update the API base URL in `src/context/AuthContext.jsx` if your backend runs on a different URL:

```javascript
const API_BASE_URL = "http://localhost:3001"; // Change port or URL as needed
```

**Default Configuration:**
- Development: `http://localhost:3001`
- Production: Update to your production server URL

## Questions & Support

For issues or questions regarding JWT authentication:
1. Check the browser console for error messages
2. Check the backend server logs
3. Verify all endpoints are correctly configured
4. Ensure both frontend and backend are running
