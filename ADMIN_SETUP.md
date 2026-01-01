# Admin Dashboard Setup Guide

## Environment Variables

Add the following to your `.env.local` file:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password-here

# MongoDB (already configured)
MONGODB_URI=your-mongodb-connection-string
```

## Generate NEXTAUTH_SECRET

You can generate a secure secret using:

```bash
openssl rand -base64 32
```

Or use any random string generator.

## Password Security

For production, it's recommended to hash your password. You can use the following script:

```javascript
// scripts/hashPassword.js
import bcrypt from "bcryptjs";

const password = "your-password";
const hash = await bcrypt.hash(password, 10);
console.log("Hashed password:", hash);
```

Then update your `.env.local` with the hashed password.

## Accessing the Admin Dashboard

1. Start your development server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/login`
3. Login with your admin credentials

## Features

- ✅ Secure authentication with NextAuth.js
- ✅ Create, read, update, and delete blog posts
- ✅ Publish/unpublish posts
- ✅ Search and filter posts
- ✅ Pagination for large lists
- ✅ Form validation
- ✅ Confirmation dialogs for destructive actions
- ✅ SEO fields (title, description)
- ✅ Responsive design

## Admin Routes

- `/admin` - Dashboard (list all posts)
- `/admin/login` - Login page
- `/admin/posts/new` - Create new post
- `/admin/posts/[id]` - Edit existing post

## API Routes

All API routes require admin authentication:

- `GET /api/admin/posts` - List posts (with pagination, search, filter)
- `POST /api/admin/posts` - Create new post
- `GET /api/admin/posts/[id]` - Get single post
- `PUT /api/admin/posts/[id]` - Update entire post
- `PATCH /api/admin/posts/[id]` - Partial update (e.g., publish/unpublish)
- `DELETE /api/admin/posts/[id]` - Delete post

## Security Notes

- All admin routes are protected by middleware
- API routes verify admin role before processing requests
- Passwords should be hashed in production
- Use strong, unique passwords
- Keep your `.env.local` file secure and never commit it to version control

