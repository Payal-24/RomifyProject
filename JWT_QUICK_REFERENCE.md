# 🎯 JWT Authentication - Quick Reference

## ⚡ Quick Commands

### Start Everything
```bash
# Terminal 1: Backend
cd d:\romify\romify
$env:PORT=3001 ; node backend/server.js

# Terminal 2: Frontend
cd d:\romify\romify
npm run dev
```

### Test API with cURL/Postman
```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"Test@123",
    "name":"Test User"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"Test@123"
  }'

# Get Profile (replace TOKEN with actual token)
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer TOKEN"

# Health Check
curl http://localhost:3001/api/health
```

---

## 🔑 Quick Code Snippets

### 1. Check if User is Logged In
```javascript
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { isAuthenticated, user } = useAuth();
  
  return isAuthenticated ? <h1>Hello {user.name}</h1> : <h1>Please Login</h1>;
}
```

### 2. Logout User
```javascript
import { useAuth } from "../context/AuthContext";

function LogoutButton() {
  const { logout } = useAuth();
  
  return <button onClick={logout}>Logout</button>;
}
```

### 3. Get JWT Token
```javascript
import { getToken } from "../utils/tokenUtils";

const token = getToken();
console.log("Current token:", token);
```

### 4. Check Token Expiration
```javascript
import { isTokenExpired, getTokenExpirationTime } from "../utils/tokenUtils";

const token = getToken();

if (isTokenExpired(token)) {
  console.log("Token expired!");
}

const msLeft = getTokenExpirationTime(token);
console.log("Expires in", Math.ceil(msLeft / 1000), "seconds");
```

### 5. Make Protected API Call
```javascript
import { useAuth } from "../context/AuthContext";

function ProtectedComponent() {
  const { token } = useAuth();
  
  const fetchData = async () => {
    const response = await fetch("http://localhost:3001/api/auth/profile", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log(data);
  };
  
  return <button onClick={fetchData}>Fetch Profile</button>;
}
```

### 6. Protect Routes
```javascript
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Usage in App.jsx
<Route 
  path="/dashboard" 
  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
/>
```

---

## 📊 State Management Flow

```
User Signup/Login
       ↓
Backend API (/api/auth/register or /api/auth/login)
       ↓
Password Hashing (bcryptjs)
       ↓
JWT Token Generation
       ↓
Store in localStorage (authToken, authUser)
       ↓
Update AuthContext State (user, token, isAuthenticated)
       ↓
Component re-renders with new auth state
```

---

## 🔐 Token Structure

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 . 
eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20ifQ .
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

HEADER . PAYLOAD . SIGNATURE
```

Payload contains:
```json
{
  "id": "1234567890",
  "email": "user@example.com",
  "name": "John Doe",
  "iat": 1713613200,
  "exp": 1714218000
}
```

---

## 🗂️ File Locations

```
d:\romify\romify\
├── backend/
│   └── server.js ...................... Backend JWT server
├── src/
│   ├── components/
│   │   ├── Login.jsx .................. Login form
│   │   └── SignUp.jsx ................. SignUp form
│   ├── context/
│   │   └── AuthContext.jsx ............ Global auth state
│   ├── utils/
│   │   └── tokenUtils.js .............. Token helpers
│   ├── App.jsx ........................ App with AuthProvider
│   └── main.jsx
├── package.json
└── JWT_AUTH_COMPLETE_GUIDE.md ......... Full documentation
```

---

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot POST /api/auth/login` | Backend not running | Start backend on port 3001 |
| `Invalid email or password` | Wrong credentials | Check if account exists |
| `CORS error` | Backend CORS not enabled | Already enabled, check ports |
| `Token is invalid` | Token expired or tampered | Login again for new token |
| `Module not found: jsonwebtoken` | Missing dependency | `npm install jsonwebtoken bcryptjs` |
| `fetch failed` | API URL wrong | Check `API_BASE_URL` in AuthContext |

---

## 📈 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    React Component                       │
│                  (Login/SignUp Form)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                 useAuth() Hook                           │
│            (AuthContext Consumer)                        │
└────────────────────┬────────────────────────────────────┘
                     │ calls login(email, password)
                     ↓
┌─────────────────────────────────────────────────────────┐
│              AuthContext.jsx                             │
│     (Manages user, token, loading, error)               │
└────────────────────┬────────────────────────────────────┘
                     │ fetches POST /api/auth/login
                     ↓
┌─────────────────────────────────────────────────────────┐
│           Express Backend Server                        │
│              (backend/server.js)                        │
│         - Validates credentials                         │
│         - Hashes password with bcryptjs                │
│         - Generates JWT token                           │
└────────────────────┬────────────────────────────────────┘
                     │ returns { token, user }
                     ↓
┌─────────────────────────────────────────────────────────┐
│           Browser localStorage                          │
│         - Stores authToken                              │
│         - Stores authUser                               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│              AuthContext State                           │
│         - Sets user object                              │
│         - Sets token                                    │
│         - Sets isAuthenticated = true                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│          Components Receive New State                   │
│            (Buttons, Navbar, etc)                       │
│               Re-render                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Working with Tokens

### Store Token
```javascript
// Automatically done by register() or login()
localStorage.setItem("authToken", token);
```

### Retrieve Token
```javascript
import { getToken } from "../utils/tokenUtils";

const token = getToken();
```

### Use Token in API Calls
```javascript
const response = await fetch(url, {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});
```

### Remove Token (Logout)
```javascript
import { removeToken } from "../utils/tokenUtils";

removeToken();
// OR use useAuth hook
const { logout } = useAuth();
logout();
```

---

## 📝 API Response Examples

### Success Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 🔧 Environment Variables (Optional)

```bash
# .env file (if using dotenv)
VITE_API_URL=http://localhost:3001
JWT_SECRET=your_super_secret_key_here_change_in_production
```

---

## ✨ Common Use Cases

### 1. Verify User Before Loading Feature
```javascript
const { isAuthenticated } = useAuth();

if (!isAuthenticated) {
  return <div>Please log in to access this feature</div>;
}
```

### 2. Show User Name in Header
```javascript
const { user } = useAuth();

return <p>Welcome, {user?.name}!</p>;
```

### 3. Auto-logout When Token Expires
```javascript
useEffect(() => {
  const token = getToken();
  const msLeft = getTokenExpirationTime(token);
  
  if (msLeft > 0) {
    setTimeout(() => {
      logout();
      navigate("/login");
    }, msLeft);
  }
}, []);
```

### 4. Show Login/Logout Button Based on Auth
```javascript
const { isAuthenticated, logout } = useAuth();

return (
  <div>
    {isAuthenticated ? (
      <button onClick={logout}>Logout</button>
    ) : (
      <a href="/login">Login</a>
    )}
  </div>
);
```

---

## 🎓 Learning Resources

- JWT.io - Understand JWT tokens
- bcryptjs docs - Password hashing
- Express.js docs - Node server
- React Context docs - State management

---

## 📞 Support

For detailed information, see: [JWT_AUTHENTICATION_GUIDE.md](JWT_AUTHENTICATION_GUIDE.md)

For full code and examples, see: [JWT_AUTH_COMPLETE_GUIDE.md](JWT_AUTH_COMPLETE_GUIDE.md)
