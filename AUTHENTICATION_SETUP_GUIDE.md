# 🔐 Complete Authentication Setup Guide

This guide will help you set up both **Google OAuth2** and **Magic Link** authentication for your Next.js application.

## 📋 Prerequisites

- MongoDB database (Atlas or local)
- Google Cloud Console account
- Resend account for email delivery
- Node.js and npm installed

## 🔧 Step 1: Environment Variables Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your environment variables in `.env.local`:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth2 Configuration
GOOGLE_ID=your-google-client-id-here
GOOGLE_SECRET=your-google-client-secret-here

# Email Provider (Resend for Magic Links)
RESEND_API_KEY=your-resend-api-key-here

# MongoDB Database Configuration
MONGODB_URI=your-mongodb-connection-string-here

# Optional: Environment
NODE_ENV=development
```

## 🌐 Step 2: Google OAuth2 Setup

### 2.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API

### 2.2 Configure OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Fill in required information:
   - **App name**: The Art of Productive Struggle
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users (for development)

### 2.3 Create OAuth2 Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Choose **Web application**
4. Configure:
   - **Name**: Your app name
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000`
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://yourdomain.com/api/auth/callback/google` (production)
5. Copy **Client ID** and **Client Secret** to your `.env.local`

## 📧 Step 3: Resend Email Setup (Magic Links)

### 3.1 Create Resend Account
1. Go to [Resend](https://resend.com/)
2. Sign up for an account
3. Verify your email address

### 3.2 Get API Key
1. Go to **API Keys** in your Resend dashboard
2. Create a new API key
3. Copy the API key to your `.env.local` as `RESEND_API_KEY`

### 3.3 Configure Domain (Optional for Production)
1. Go to **Domains** in Resend
2. Add your domain
3. Configure DNS records as instructed
4. Wait for domain verification

## 🗄️ Step 4: MongoDB Database Setup

### 4.1 MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user:
   - Go to **Database Access**
   - Add a new user with read/write access
5. Configure network access:
   - Go to **Network Access**
   - Add IP address (0.0.0.0/0 for development)
6. Get connection string:
   - Go to **Database** → **Connect**
   - Choose **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your user password
   - Add to `.env.local` as `MONGODB_URI`

### 4.2 Local MongoDB (Alternative)
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/your-database-name`

## 🧪 Step 5: Testing Authentication

### 5.1 Start Development Server
```bash
npm run dev
```

### 5.2 Test Google OAuth2
1. Go to `http://localhost:3000/api/auth/signin`
2. Click "Sign in with Google"
3. Complete OAuth flow
4. Check if redirected to dashboard

### 5.3 Test Magic Link
1. Go to `http://localhost:3000/api/auth/signin`
2. Enter your email address
3. Click "Sign in with Email"
4. Check your email for magic link
5. Click the link to sign in

### 5.4 Validate Authentication
1. Go to `http://localhost:3000/dashboard`
2. Check the "Authentication Status" section
3. Click "Refresh" to run validation
4. Verify all status indicators are green

## 🔍 Step 6: Database Validation

### 6.1 Check Collections
Your MongoDB database should have these collections after authentication:
- `users` - User profile information
- `accounts` - OAuth provider account links
- `sessions` - User sessions (if using database sessions)
- `verification_tokens` - Magic link tokens

### 6.2 Verify User Data
Connect to your MongoDB database and check:

```javascript
// MongoDB Shell commands
use your-database-name

// Check users collection
db.users.find().pretty()

// Check accounts collection
db.accounts.find().pretty()

// Check sessions (if using database sessions)
db.sessions.find().pretty()
```

### 6.3 Expected User Document Structure
```json
{
  "_id": "ObjectId(...)",
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://...",
  "emailVerified": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 6.4 Expected Account Document Structure
```json
{
  "_id": "ObjectId(...)",
  "userId": "ObjectId(...)",
  "type": "oauth",
  "provider": "google",
  "providerAccountId": "1234567890",
  "access_token": "...",
  "expires_at": 1234567890,
  "token_type": "Bearer",
  "scope": "openid email profile",
  "id_token": "...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🐛 Common Issues & Solutions

### Issue 1: "Invalid Redirect URI"
**Solution**: Ensure your Google OAuth2 redirect URIs exactly match your configured URLs.

### Issue 2: "Email Not Sent"
**Solution**: 
- Check Resend API key is correct
- Verify sender email domain
- Check spam folder

### Issue 3: "Database Connection Failed"
**Solution**:
- Verify MongoDB connection string
- Check network access settings
- Ensure database user has proper permissions

### Issue 4: "Session Not Persisting"
**Solution**:
- Check NEXTAUTH_SECRET is set
- Verify cookie settings
- Clear browser cookies and try again

## 📱 Production Deployment

### 1. Update Environment Variables
- Change `NEXTAUTH_URL` to your production domain
- Update Google OAuth2 redirect URIs
- Use production MongoDB cluster
- Configure Resend domain

### 2. Security Checklist
- [ ] Use strong `NEXTAUTH_SECRET`
- [ ] Restrict MongoDB network access
- [ ] Configure proper CORS settings
- [ ] Enable HTTPS
- [ ] Review OAuth2 consent screen

## 🎯 Testing Endpoints

### Authentication Validation
- **GET** `/api/auth/validate` - Check authentication status

### NextAuth Endpoints
- **GET** `/api/auth/signin` - Sign in page
- **POST** `/api/auth/signin/google` - Google OAuth2
- **POST** `/api/auth/signin/email` - Magic link
- **GET** `/api/auth/signout` - Sign out
- **GET** `/api/auth/session` - Current session

### Protected Routes
- `/dashboard` - User dashboard (requires authentication)

## 📊 Monitoring & Analytics

### Database Queries to Monitor
```javascript
// Count total users
db.users.countDocuments()

// Count Google OAuth users
db.accounts.countDocuments({ provider: "google" })

// Count magic link users
db.users.countDocuments({ 
  "_id": { 
    "$not": { 
      "$in": db.accounts.distinct("userId") 
    } 
  } 
})

// Recent signups (last 7 days)
db.users.countDocuments({
  createdAt: {
    $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  }
})
```

## 🔗 Useful Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth2 Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [Resend Documentation](https://resend.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

---

✅ **Setup Complete!** Your authentication system is now ready with both Google OAuth2 and Magic Link support.

For any issues, check the validation endpoint at `/api/auth/validate` and review the database collections mentioned above.
