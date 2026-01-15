# Deployment Guide - Hostinger

This guide will help you deploy the Income Statement Tutor application to Hostinger.

## Prerequisites

- Hostinger account with Node.js hosting
- Git repository with the application code
- SSH access to your Hostinger server

## Deployment Steps

### 1. Build the Application

```bash
cd income-statement-tutor
npm run build
```

### 2. Prepare for Production

The application uses SQLite, which is perfect for deployment. The database file will be included in the deployment.

### 3. Deploy to Hostinger

#### Option A: Manual Deployment via FTP/SSH

1. **Build the production bundle:**
   ```bash
   npm run build
   ```

2. **Upload these folders/files to your Hostinger public_html directory:**
   - `.next/` folder (built application)
   - `node_modules/` folder
   - `package.json`
   - `package-lock.json`
   - `next.config.ts`
   - `prisma/` folder (includes schema and database)
   - `.env` file (with production database URL)
   - `public/` folder

3. **Set up Node.js on Hostinger:**
   - Go to Hostinger Control Panel
   - Navigate to "Advanced" → "Node.js"
   - Set Application URL (e.g., incomestatementtutor.yourdomain.com)
   - Set Application Root to `/public_html/income-statement-tutor`
   - Set Application Startup File to `node_modules/next/dist/bin/next`
   - Add Application Startup Command: `start`
   - Set Node.js version to 18.x or higher

#### Option B: Git Deployment

1. **Connect your Hosting via SSH**

2. **Clone the repository:**
   ```bash
   cd public_html
   git clone https://github.com/pranaypatil02/MyPrograms.git
   cd MyPrograms/stock-learning-platform/income-statement-tutor
   ```

3. **Install dependencies:**
   ```bash
   npm install --production
   ```

4. **Build the application:**
   ```bash
   npm run build
   ```

5. **Start the application:** (Hostinger usually handles this via their Node.js manager)

### 4. Environment Variables

Create a `.env.production` file:

```env
NODE_ENV=production
DATABASE_URL="file:./prisma/dev.db"
```

### 5. Configure Next.js for Hostinger

The `next.config.ts` should include:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // For easier deployment
};

export default nextConfig;
```

### 6. Application URL Setup

Set up your custom domain or subdomain in Hostinger:
1. Go to Domains section
2. Point your domain/subdomain to the Node.js application
3. Update DNS if needed

## Post-Deployment

### Verify Deployment

1. Visit your application URL
2. Test all four modes:
   - Learn mode (`/learn`)
   - Builder mode (`/builder`)
   - Analysis mode (`/analysis`)
   - Valuation mode (`/valuation`)

### Database Management

- The SQLite database is included in the deployment
- To reset/update the database:
  ```bash
  npm run db:push
  npm run db:seed
  ```

## Troubleshooting

### Common Issues

**1. Application won't start:**
- Check Node.js version (must be 18+)
- Verify all dependencies are installed
- Check startup file path in Hostinger panel

**2. Database errors:**
- Ensure `prisma/dev.db` file exists
- Run `npm run db:generate` and `npm run db:push`

**3. Static files not loading:**
- Check the `public/` folder is uploaded
- Verify Next.js build completed successfully

**4. Environment variables not working:**
- Ensure `.env` file is in the root directory
- Check file permissions (should be readable)

## Performance Optimization

For better performance on Hostinger:

1. **Enable compression** in Next.js config
2. **Use CDN** for static assets if available
3. **Monitor memory usage** - SQLite is lightweight but watch Node.js memory

## Backup Strategy

1. **Backup database regularly:**
   ```bash
   cp prisma/dev.db prisma/dev.db.backup
   ```

2. **Export data as JSON:**
   ```bash
   # Custom script to export data
   node scripts/export-data.js > backup.json
   ```

## Updates and Maintenance

To update  the application:

1. Pull latest changes:
   ```bash
   git pull origin main
   ```

2. Install any new dependencies:
   ```bash
   npm install
   ```

3. Rebuild:
   ```bash
   npm run build
   ```

4. Restart the application via Hostinger panel

## Support

- Hostinger Support: https://support.hostinger.com
- Next.js Documentation: https://nextjs.org/docs
- Application Issues: Check GitHub repository

---

**Production Checklist:**
- [ ] Built application (`npm run build`)
- [ ] Uploaded all necessary files
- [ ] Configured Node.js in Hostinger panel
- [ ] Set environment variables
- [ ] Tested all application modes
- [ ] Set up custom domain/subdomain
- [ ] Verified database is working
- [ ] Created database backup

**Your application is ready for production! 🎉**
