#!/bin/bash

# Automated Upload to Hostinger via SSH/SCP
# Requires SSH credentials to be configured

set -e

# Configuration - Update these with your Hostinger details
HOSTINGER_USER="${HOSTINGER_USER:-your_username}"
HOSTINGER_HOST="${HOSTINGER_HOST:-your_server.hostinger.com}"
HOSTINGER_PORT="${HOSTINGER_PORT:-22}"
HOSTINGER_PATH="${HOSTINGER_PATH:-/home/your_username/public_html/income-statement-tutor}"

echo "📤 Uploading to Hostinger..."
echo "Server: $HOSTINGER_USER@$HOSTINGER_HOST:$HOSTINGER_PORT"
echo "Path: $HOSTINGER_PATH"
echo ""

# Upload the deployment package
echo "Uploading deploy.tar.gz..."
scp -P $HOSTINGER_PORT deploy.tar.gz $HOSTINGER_USER@$HOSTINGER_HOST:$HOSTINGER_PATH/

# Extract and setup on server
echo "Extracting on server..."
ssh -p $HOSTINGER_PORT $HOSTINGER_USER@$HOSTINGER_HOST << 'ENDSSH'
cd $HOSTINGER_PATH
tar -xzf deploy.tar.gz
rm deploy.tar.gz
echo "✅ Deployment complete!"
ENDSSH

echo ""
echo "🎉 Deployment successful!"
echo "You may need to restart the Node.js application in Hostinger control panel"
