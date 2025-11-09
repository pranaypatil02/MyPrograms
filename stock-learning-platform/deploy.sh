#!/bin/bash

# 🚀 Deployment Script for Hostinger
# This script prepares your site for deployment

echo "================================================"
echo "  Stock Analysis Platform - Deployment Script"
echo "================================================"
echo ""

# Step 1: Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Step 2: Build for production
echo "🔨 Building for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

# Step 3: Create .htaccess if not exists
echo "📝 Ensuring .htaccess exists..."
if [ ! -f "dist/.htaccess" ]; then
    cat > dist/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect HTTP to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Handle React Router - redirect all requests to index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable GZIP Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
EOF
fi

# Step 4: Create deployment package
echo "📦 Creating deployment package..."
cd dist
zip -r ../stock-platform-deploy.zip . > /dev/null 2>&1
cd ..

echo ""
echo "✅ Build complete!"
echo ""
echo "📂 Files ready in: ./dist/"
echo "📦 Deployment package: stock-platform-deploy.zip"
echo ""
echo "================================================"
echo "  Next Steps:"
echo "================================================"
echo "1. Upload 'stock-platform-deploy.zip' to Hostinger"
echo "2. Extract to public_html directory"
echo "3. Visit https://fundamental-analysis.xyz"
echo ""
echo "Or upload the 'dist' folder contents directly via FTP"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo "================================================"
