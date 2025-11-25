# Authentication Setup Guide

This guide will help you set up GitHub OAuth authentication for DevHub Pro.

## Prerequisites

- A GitHub account
- Node.js and npm installed
- The DevHub Pro project cloned locally

## Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"** or **"New GitHub App"**
3. Fill in the application details:
   - **Application name**: DevHub Pro (or your preferred name)
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click **"Register application"**
5. You'll receive a **Client ID** - copy this
6. Click **"Generate a new client secret"** and copy the secret immediately (you won't be able to see it again)

## Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in your values:
   ```env
   GITHUB_ID=your_client_id_from_step_1
   GITHUB_SECRET=your_client_secret_from_step_1
   NEXTAUTH_SECRET=generate_using_command_below
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Generate a `NEXTAUTH_SECRET` using this command:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as your `NEXTAUTH_SECRET` value.

## Step 3: Install Dependencies

If you haven't already, install the required dependencies:

```bash
npm install
```

The authentication packages are already included:
- `next-auth` - Authentication for Next.js
- `@next-auth/providers` - OAuth providers

## Step 4: Start the Development Server

```bash
npm run dev
```

Your application should now be running at `http://localhost:3000`

## Step 5: Test Authentication

1. Open your browser and go to `http://localhost:3000`
2. Click the **"Sign In"** button in the navigation
3. Click **"Continue with GitHub"** in the modal
4. Authorize the application when prompted by GitHub
5. You should be redirected back to the homepage, now signed in
6. Click on **"Profile"** to view your user profile

## Features Enabled by Authentication

Once authenticated, users can:

- ✅ **Submit Articles** - Share technical articles at `/submit-article`
- ✅ **Submit Error Solutions** - Help others by sharing solutions at `/submit-solution`
- ✅ **Access Profile** - View and manage their profile at `/profile`
- ✅ **Track Contributions** - See their articles, solutions, and reputation

## Production Deployment

When deploying to production:

1. Update your GitHub OAuth App settings:
   - **Homepage URL**: Your production domain (e.g., `https://devhubpro.com`)
   - **Authorization callback URL**: `https://your-domain.com/api/auth/callback/github`

2. Update your `.env` or environment variables in your hosting platform:
   ```env
   NEXTAUTH_URL=https://your-production-domain.com
   GITHUB_ID=your_client_id
   GITHUB_SECRET=your_client_secret
   NEXTAUTH_SECRET=your_generated_secret
   ```

3. Make sure to keep your secrets secure and never commit them to version control

## Troubleshooting

### "Configuration error" when signing in
- Verify that all environment variables are set correctly
- Make sure `NEXTAUTH_SECRET` is at least 32 characters long
- Restart your development server after changing environment variables

### "Redirect URI mismatch" error
- Check that your callback URL in GitHub OAuth settings matches exactly
- For development: `http://localhost:3000/api/auth/callback/github`
- For production: `https://your-domain.com/api/auth/callback/github`

### Session not persisting
- Clear your browser cookies and cache
- Check browser console for errors
- Verify that the `AuthProvider` is wrapping your app in `layout.tsx`

## Security Notes

- Never commit `.env.local` or `.env` files to version control
- Keep your `GITHUB_SECRET` and `NEXTAUTH_SECRET` confidential
- Regenerate secrets if they are ever exposed
- Use different secrets for development and production

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [GitHub OAuth Apps Guide](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## Support

If you encounter any issues, please:
1. Check the troubleshooting section above
2. Review the [NextAuth.js documentation](https://next-auth.js.org/getting-started/introduction)
3. Open an issue on the GitHub repository
