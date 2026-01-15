# Deploying to Hostinger

This guide explains how to deploy the StockLearn platform to Hostinger.

## Prerequisites
- A Hostinger account with a hosting plan.
- Access to the Hostinger hPanel.

## Step 1: Build the Project
We have already configured the project for production. To create a fresh build:

1. Open your terminal in the project directory.
2. Run the build command:
   ```bash
   npm run build
   ```
3. This will create a `dist` folder containing all the necessary files.

## Step 2: Prepare for Upload
The `dist` folder contains everything you need. It should look like this:
- `assets/` (folder)
- `.htaccess` (file - crucial for routing)
- `index.html` (file)
- `vite.svg` (file)

**Note**: The `.htaccess` file is hidden on some systems (starts with a dot). It is required for the application to work correctly (handling page refreshes).

**How to see hidden files:**
- **Mac (Finder)**: Press `Cmd` + `Shift` + `.` (period) to toggle hidden files.
- **Hostinger File Manager**: Usually shows hidden files by default. If not, look for "Settings" or "Preferences" and check "Show Hidden Files".

## Step 3: Upload to Hostinger

1. **Log in** to your Hostinger hPanel.
2. Go to **File Manager**.
3. Navigate to `public_html`.
   - If you are hosting on a subdomain, navigate to that folder instead.
4. **Delete** any existing default files (like `default.php`).
5. **Upload** the contents of the `dist` folder to `public_html`.
   - You can zip the contents of `dist`, upload the zip, and extract it in File Manager for faster transfer.
   - **Important**: Ensure `.htaccess` is included in the upload.

## Step 4: Verify Deployment
1. Open your website URL.
2. Navigate to different pages (e.g., Tools -> Sector Heatmap).
3. Refresh the page. If it reloads correctly without a 404 error, the `.htaccess` configuration is working.

## Troubleshooting
- **404 on Refresh**: This means `.htaccess` is missing or not working. Ensure it is present in `public_html`.
- **Blank Page**: Check the browser console (F12) for errors. It might be a base path issue (if hosting in a subdirectory).
- **403 Forbidden**: This almost always means **`index.html` is missing from the main folder**.
  - **Check**: Did you upload the *folder* `dist`?
  - **Fix**: You must open `dist`, select **ALL files** inside it (index.html, assets, .htaccess), and move them DIRECTLY into `public_html`.
  - **Correct Structure**: `public_html/index.html` (NOT `public_html/dist/index.html`).
