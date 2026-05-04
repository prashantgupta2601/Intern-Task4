# Nexus SaaS - Premium Dashboard & API Integration

Nexus is a production-grade Node.js application featuring Google OAuth authentication, Role-Based Access Control (RBAC), real-time external API integration, and analytics visualization.

## 🚀 Features

- **Premium UI/UX**: Modern, responsive dashboard built with Bootstrap 5 and customized with a sleek dark-themed sidebar.
- **Secure Authentication**: Integrated Google OAuth 2.0 using Passport.js.
- **Role-Based Access Control (RBAC)**: Secure routes with distinct permissions for Users and Admins.
- **Real-time Data**: Live cryptocurrency data feed from CoinGecko API.
- **Analytics Visualization**: Interactive usage charts powered by Chart.js.
- **Production Ready**: Optimized security with Helmet, CORS, and secure session management.
- **Deployment Ready**: Includes Dockerfile and Procfile for seamless deployment.

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Frontend**: EJS, Bootstrap 5, Chart.js, Toastify JS
- **Security**: Passport.js, Helmet, CORS, Express-Rate-Limit
- **DevOps**: Docker, Git

## 📋 Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Google Cloud Console Project (for OAuth credentials)

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prashantgupta2601/Intern-Task4.git
   cd Intern-Task4
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CALLBACK_URL=http://localhost:5000/auth/google/callback
   SESSION_SECRET=your_random_session_secret
   NODE_ENV=development
   ```

4. **Run the application:**
   ```bash
   # Development mode
   npm start
   ```

5. **Access the app:**
   Open `http://localhost:5000` in your browser.

## 🐳 Docker Support

Build and run using Docker:
```bash
docker build -t nexus-saas .
docker run -p 5000:5000 --env-file .env nexus-saas
```

## 🛡 Security Highlights

- **Rate Limiting**: Prevents brute-force attacks on API endpoints.
- **Secure Cookies**: HTTP-only and Secure flags used in production.
- **CSP Headers**: Content Security Policy configured to allow trusted CDNs.

## 📄 License

This project is licensed under the ISC License.
