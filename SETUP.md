# DevHub Pro - Setup & Deployment Guide

Complete guide to set up OAuth authentication and deploy DevHub Pro to AWS or Hostinger.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [OAuth Setup](#oauth-setup)
  - [Google OAuth Setup](#google-oauth-setup)
  - [GitHub OAuth Setup](#github-oauth-setup)
- [Database Setup](#database-setup)
- [Local Development](#local-development)
- [Deployment](#deployment)
  - [AWS Deployment](#aws-deployment)
  - [Hostinger Deployment](#hostinger-deployment)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Git installed
- A Google account (for Google OAuth)
- A GitHub account (for GitHub OAuth)
- AWS account (for AWS deployment) OR Hostinger account (for Hostinger deployment)

---

## Environment Setup

1. **Clone the repository** (if you haven't already):
```bash
cd /path/to/DevHubPro
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create environment file**:
```bash
cp .env.example .env.local
```

If `.env.example` doesn't exist, create `.env.local` with the following:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Node Environment
NODE_ENV=development
```

4. **Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```
Copy the output and replace `your-super-secret-key-change-this-in-production` in `.env.local`

---

## OAuth Setup

### Google OAuth Setup

1. **Go to Google Cloud Console**:
   - Visit: https://console.cloud.google.com/

2. **Create a New Project**:
   - Click "Select a project" → "New Project"
   - Enter project name: `DevHub Pro`
   - Click "Create"

3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Configure OAuth Consent Screen**:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Select "External" user type
   - Click "Create"
   - Fill in required fields:
     - **App name**: DevHub Pro
     - **User support email**: your-email@gmail.com
     - **Developer contact**: your-email@gmail.com
   - Click "Save and Continue"
   - Skip "Scopes" (click "Save and Continue")
   - Skip "Test users" (click "Save and Continue")
   - Click "Back to Dashboard"

5. **Create OAuth Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Select "Web application"
   - Name: `DevHub Pro Web`
   - Add **Authorized JavaScript origins**:
     - `http://localhost:3000` (for local development)
     - `https://yourdomain.com` (for production)
   - Add **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (for local)
     - `https://yourdomain.com/api/auth/callback/google` (for production)
   - Click "Create"

6. **Copy Credentials**:
   - Copy **Client ID** → Paste into `GOOGLE_CLIENT_ID` in `.env.local`
   - Copy **Client Secret** → Paste into `GOOGLE_CLIENT_SECRET` in `.env.local`

---

### GitHub OAuth Setup

1. **Go to GitHub Developer Settings**:
   - Visit: https://github.com/settings/developers
   - Or: GitHub → Settings → Developer settings → OAuth Apps

2. **Create New OAuth App**:
   - Click "New OAuth App"
   - Fill in the form:
     - **Application name**: DevHub Pro
     - **Homepage URL**:
       - Local: `http://localhost:3000`
       - Production: `https://yourdomain.com`
     - **Application description**: Free Developer Tools & Resources
     - **Authorization callback URL**:
       - Local: `http://localhost:3000/api/auth/callback/github`
       - Production: `https://yourdomain.com/api/auth/callback/github`
   - Click "Register application"

3. **Copy Credentials**:
   - Copy **Client ID** → Paste into `GITHUB_ID` in `.env.local`
   - Click "Generate a new client secret"
   - Copy **Client Secret** → Paste into `GITHUB_SECRET` in `.env.local`
   - ⚠️ **Important**: Save the secret immediately - you won't be able to see it again!

4. **For Production Deployment**:
   - Create a separate OAuth App with your production URL
   - OR update the existing app's URLs after deployment

---

## Database Setup

DevHub Pro uses Prisma with SQLite (local) or PostgreSQL/MySQL (production).

1. **Initialize Prisma** (if not already done):
```bash
npx prisma generate
```

2. **Run Migrations**:
```bash
npx prisma migrate dev
```

3. **Seed Database (Optional)**:
```bash
npx prisma db seed
```

4. **View Database**:
```bash
npx prisma studio
```
Opens a GUI at http://localhost:5555

---

## Local Development

1. **Start the development server**:
```bash
npm run dev
```

2. **Open your browser**:
   - Navigate to: http://localhost:3000

3. **Test OAuth**:
   - Click "Sign In" button
   - Try both Google and GitHub authentication
   - Check if user data is saved in database

---

## Deployment

### AWS Deployment

#### Option 1: AWS Amplify (Easiest - Recommended)

1. **Prepare Your Repository**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/devhub-pro.git
git push -u origin main
```

2. **Deploy to AWS Amplify**:
   - Go to: https://console.aws.amazon.com/amplify/
   - Click "New app" → "Host web app"
   - Select "GitHub" or your Git provider
   - Authorize AWS Amplify
   - Select your repository and branch
   - Configure build settings:
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - npm ci
         build:
           commands:
             - npm run build
       artifacts:
         baseDirectory: .next
         files:
           - '**/*'
       cache:
         paths:
           - node_modules/**/*
     ```
   - Click "Next"

3. **Add Environment Variables**:
   - In Amplify Console → App settings → Environment variables
   - Add all variables from `.env.local`:
     ```
     NEXTAUTH_URL=https://your-app-id.amplifyapp.com
     NEXTAUTH_SECRET=your-generated-secret
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     GITHUB_ID=your-github-client-id
     GITHUB_SECRET=your-github-client-secret
     DATABASE_URL=your-production-database-url
     ```
   - Click "Save"

4. **Configure Database**:
   - Use **AWS RDS** for PostgreSQL:
     - Create RDS PostgreSQL instance
     - Get connection string
     - Update `DATABASE_URL` environment variable
   - OR use **PlanetScale** (free tier):
     - Sign up at https://planetscale.com/
     - Create database
     - Get connection string
     - Update `DATABASE_URL`

5. **Update OAuth Redirect URIs**:
   - Google Cloud Console → Add `https://your-app-id.amplifyapp.com/api/auth/callback/google`
   - GitHub OAuth App → Add `https://your-app-id.amplifyapp.com/api/auth/callback/github`

6. **Deploy**:
   - Click "Save and deploy"
   - Wait for build to complete (~5-10 minutes)
   - Your app will be live at: `https://your-app-id.amplifyapp.com`

7. **Add Custom Domain** (Optional):
   - In Amplify Console → Domain management
   - Click "Add domain"
   - Follow DNS configuration steps
   - Update OAuth redirect URIs with new domain

#### Option 2: AWS EC2 (More Control)

1. **Launch EC2 Instance**:
   - Go to AWS EC2 Console
   - Click "Launch Instance"
   - Choose Ubuntu Server 22.04 LTS
   - Instance type: t2.micro (free tier) or t2.small
   - Configure security group:
     - Allow SSH (port 22)
     - Allow HTTP (port 80)
     - Allow HTTPS (port 443)
   - Create and download key pair

2. **Connect to EC2**:
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Dependencies**:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

4. **Clone and Setup Project**:
```bash
# Clone your repository
git clone https://github.com/yourusername/devhub-pro.git
cd devhub-pro

# Install dependencies
npm install

# Create production .env
nano .env.local
# Paste your production environment variables
# Press Ctrl+X, then Y, then Enter to save

# Build the project
npm run build
```

5. **Setup PM2**:
```bash
# Start the app with PM2
pm2 start npm --name "devhub-pro" -- start

# Make PM2 start on system boot
pm2 startup
pm2 save
```

6. **Configure Nginx**:
```bash
sudo nano /etc/nginx/sites-available/devhub-pro
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/devhub-pro /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Setup SSL with Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

### Hostinger Deployment

#### Prerequisites:
- Hostinger account with VPS or Business hosting plan
- SSH access enabled

#### Deployment Steps:

1. **Access Your Hostinger Panel**:
   - Login to https://hpanel.hostinger.com/
   - Go to your hosting plan

2. **Enable SSH Access**:
   - Go to "Advanced" → "SSH Access"
   - Click "Enable SSH"
   - Note your SSH credentials

3. **Connect via SSH**:
```bash
ssh your-username@your-ip-address
# Enter your password when prompted
```

4. **Install Node.js** (if not installed):
```bash
# Check if Node.js is installed
node --version

# If not installed, contact Hostinger support to install Node.js 18+
# OR if you have root access:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

5. **Upload Your Project**:

**Option A: Using Git**:
```bash
cd public_html  # or domains/yourdomain.com
git clone https://github.com/yourusername/devhub-pro.git
cd devhub-pro
```

**Option B: Using FTP/File Manager**:
- Upload your project files via Hostinger File Manager
- Or use FTP client (FileZilla)

6. **Install Dependencies and Build**:
```bash
npm install
npm run build
```

7. **Create Environment File**:
```bash
nano .env.local
# Add your production environment variables
# Update NEXTAUTH_URL to your domain
```

8. **Setup Process Manager**:
```bash
# Install PM2 globally
npm install -g pm2

# Start your app
pm2 start npm --name "devhub-pro" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

9. **Configure Apache/Nginx** (in Hostinger Panel):
   - Go to "Advanced" → "Apache Configuration" or "Nginx Configuration"
   - Add proxy configuration:

For Apache (.htaccess):
```apache
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/devhub-pro
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

For Nginx:
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

10. **Setup Database**:
    - Create MySQL database in Hostinger panel
    - Update `DATABASE_URL` in `.env.local`:
    ```
    DATABASE_URL="mysql://username:password@localhost:3306/database_name"
    ```
    - Run migrations:
    ```bash
    npx prisma migrate deploy
    ```

11. **Enable SSL**:
    - In Hostinger panel → SSL → Install Free SSL
    - Update `NEXTAUTH_URL` to use `https://`

12. **Update OAuth Redirect URIs**:
    - Add your Hostinger domain to Google and GitHub OAuth apps

---

## Post-Deployment

### 1. Test Your Deployment

- Visit your deployed URL
- Test all features:
  - ✅ Homepage loads correctly
  - ✅ Tools pages work
  - ✅ Code playground functions
  - ✅ Google OAuth sign-in works
  - ✅ GitHub OAuth sign-in works
  - ✅ News ticker shows latest news
  - ✅ Tool usage tracking works
  - ✅ Visitor counter updates

### 2. Monitor Your Application

**AWS Amplify**:
- Check build logs in Amplify Console
- Monitor app performance

**AWS EC2/Hostinger**:
```bash
# Check PM2 logs
pm2 logs devhub-pro

# Monitor PM2 status
pm2 status

# Restart if needed
pm2 restart devhub-pro
```

### 3. Setup Analytics (Optional)

Add Google Analytics or Vercel Analytics to track usage:

1. **Google Analytics**:
   - Create GA4 property
   - Add tracking code to `app/layout.tsx`

2. **Vercel Analytics**:
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

// In return statement:
<Analytics />
```

### 4. Setup Error Monitoring (Optional)

Use Sentry for error tracking:

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

## Troubleshooting

### Common Issues:

#### 1. OAuth "redirect_uri_mismatch" Error
**Solution**:
- Verify redirect URIs in Google/GitHub OAuth settings match exactly
- Include http:// or https://
- No trailing slashes

#### 2. Database Connection Error
**Solution**:
- Check `DATABASE_URL` format
- Ensure database is accessible
- Run `npx prisma generate` and `npx prisma migrate deploy`

#### 3. Build Fails on Deployment
**Solution**:
- Check build logs
- Ensure all environment variables are set
- Verify Node.js version (18+)
- Clear cache and rebuild

#### 4. 500 Internal Server Error
**Solution**:
- Check server logs: `pm2 logs devhub-pro`
- Verify `.env.local` has all required variables
- Check database connection

#### 5. News Ticker Not Showing
**Solution**:
- Check if Hacker News API is accessible
- Verify `/api/news` endpoint returns data
- Check browser console for errors

#### 6. Tools Not Tracking Usage
**Solution**:
- Verify database connection
- Check `/api/tool-usage/track` endpoint
- Ensure User table has anonymous user

---

## Environment Variables Reference

### Required Variables:

```env
# Database (Use appropriate connection string for your database)
DATABASE_URL="file:./dev.db"  # SQLite (local)
# DATABASE_URL="postgresql://user:password@host:5432/dbname"  # PostgreSQL (production)
# DATABASE_URL="mysql://user:password@host:3306/dbname"  # MySQL (production)

# NextAuth
NEXTAUTH_URL=http://localhost:3000  # Change to your production URL
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Optional
NODE_ENV=production
```

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server

# Database
npx prisma generate     # Generate Prisma client
npx prisma migrate dev  # Run migrations (dev)
npx prisma migrate deploy  # Run migrations (production)
npx prisma studio       # Open Prisma Studio

# PM2 Management
pm2 start npm --name "devhub-pro" -- start
pm2 stop devhub-pro
pm2 restart devhub-pro
pm2 delete devhub-pro
pm2 logs devhub-pro
pm2 monit

# Git
git add .
git commit -m "Update"
git push origin main
```

---

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review server logs
3. Check browser console for errors
4. Verify all environment variables are set correctly
5. Ensure OAuth redirect URIs are configured properly

---

## Security Checklist

- [ ] Use strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Never commit `.env.local` to Git
- [ ] Use HTTPS in production
- [ ] Restrict database access to specific IPs
- [ ] Enable rate limiting for APIs
- [ ] Keep dependencies updated: `npm audit fix`
- [ ] Use separate OAuth apps for development and production
- [ ] Enable 2FA on AWS/Hostinger accounts

---

**Deployment Complete!** 🎉

Your DevHub Pro application should now be live and accessible to users worldwide.
