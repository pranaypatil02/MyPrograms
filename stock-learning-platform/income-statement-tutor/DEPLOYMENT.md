# Automated Deployment Setup

## Quick Start

### Option 1: One-Command Deployment (Manual Upload)

```bash
npm run deploy
```

This will:
1. Run all tests
2. Build the production bundle
3. Create `deploy.tar.gz` package
4. Show instructions for uploading to Hostinger

Then upload the `deploy.tar.gz` file to your Hostinger server via FTP/cPanel File Manager.

### Option 2: Fully Automated Deployment (SSH)

**First-time setup:**

1. Create `.env.deployment` file with your Hostinger credentials:

```bash
HOSTINGER_USER=your_cpanel_username
HOSTINGER_HOST=your_server.hostinger.com
HOSTINGER_PORT=22
HOSTINGER_PATH=/home/your_username/public_html/income-statement-tutor
```

2. Load the environment variables:
```bash
source .env.deployment
export $(cat .env.deployment | xargs)
```

3. Deploy:
```bash
npm run deploy        # Create deployment package
npm run deploy:upload # Upload to Hostinger automatically
```

### Option 3: GitHub Actions (CI/CD)

**Setup GitHub Secrets:**

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

- `HOSTINGER_HOST` - Your server hostname
- `HOSTINGER_USER` - Your cPanel username
- `HOSTINGER_PASSWORD` - Your cPanel password
- `HOSTINGER_PORT` - SSH port (usually 22)
- `HOSTINGER_PATH` - Deployment path on server

**Automatic Deployment:**

Every push to `main` branch will automatically:
1. Run tests
2. Build the application
3. Deploy to Hostinger

You can also trigger manual deployment from GitHub Actions tab.

## Configuration Files

- `deploy.sh` - Main deployment script (builds and packages)
- `deploy-upload.sh` - Automated upload via SSH
- `.github/workflows/deploy.yml` - GitHub Actions CI/CD pipeline

## Deployment Process

The deployment package includes:
- `.next/` - Built Next.js application
- `node_modules/` - Dependencies
- `package.json` & `package-lock.json` - Package info
- `next.config.ts` - Next.js configuration
- `prisma/` - Database schema and SQLite file
- `public/` - Static assets
- `.env` - Environment variables

## Hostinger Setup (One-Time)

After first upload:

1. Log in to Hostinger Control Panel
2. Go to Advanced → Node.js
3. Create New Application:
   - **Application URL**: your domain/subdomain
   - **Application Root**: `/public_html/income-statement-tutor`
   - **Application Startup File**: `node_modules/next/dist/bin/next`
   - **Application Startup Command**: `start`
   - **Node.js Version**: 18.x or higher
4. Click "Create"

## Troubleshooting

**Error: Permission denied**
```bash
chmod +x deploy.sh deploy-upload.sh
```

**Error: SSH connection failed**
- Verify Hostinger SSH credentials
- Check if SSH is enabled in cPanel
- Confirm port number (usually 22 or 21098)

**Error: Tests failed**
- Fix failing tests before deploying
- Or skip tests: Edit `deploy.sh` and comment out the test line

## Environment Variables

Create `.env.production` on the server:

```env
NODE_ENV=production
DATABASE_URL="file:./prisma/dev.db"
```

## Database Migration

If you update the schema:

```bash
# On your server via SSH
cd /path/to/application
npm run db:push
npm run db:seed  # If you want to refresh data
```

## Monitoring

Check application logs in Hostinger:
- Navigate to Node.js section
- Click on your application
- View "Error Log" and "Access Log"

## Rollback

To rollback to a previous version:

1. Keep backups of deployment packages
2. Upload and extract the previous `deploy.tar.gz`
3. Restart the application in Hostinger panel

---

**Now deploying is as simple as:**
```bash
npm run deploy
```

Then upload `deploy.tar.gz` or use automated upload with `npm run deploy:upload`! 🚀
