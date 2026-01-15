#!/bin/bash

# Deployment Script for Hostinger
# Usage: ./deploy.sh [environment]
# Example: ./deploy.sh production

set -e  # Exit on error

ENVIRONMENT=${1:-production}

echo "🚀 Starting deployment to Hostinger ($ENVIRONMENT)..."

# Step 1: Run tests
echo "📝 Running tests..."
npm test

# Step 2: Build the application
echo "🏗️  Building application..."
npm run build

# Step 3: Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy.tar.gz \
  .next \
  node_modules \
  package.json \
  package-lock.json \
  next.config.ts \
  prisma \
  public \
  .env

echo "✅ Deployment package created: deploy.tar.gz"

echo ""
echo "📋 Next Steps for Hostinger Deployment:"
echo "1. Upload deploy.tar.gz to your Hostinger server via FTP/SFTP"
echo "2. SSH into your server and extract: tar -xzf deploy.tar.gz"
echo "3. Set up Node.js application in Hostinger control panel"
echo "4. Point to node_modules/next/dist/bin/next as startup file"
echo "5. Set startup command to 'start'"
echo ""
echo "Or use the automated upload (if SSH credentials are configured):"
echo "npm run deploy:upload"
