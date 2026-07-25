# My Portfolio

This project includes:

- React + Vite frontend
- Tailwind CSS styling
- Express backend for contact form submission
- Excel saving and optional email sending via Nodemailer

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run frontend + backend together:

   ```bash
   npm run dev:all
   ```

3. Open the frontend:
   - `http://localhost:5173`

The contact form will send requests to:

- `http://localhost:5000/api/contact`

## Deploying the backend

### Option A: Deploy full app (recommended)

You can deploy the entire repository to a Node host such as Render, Railway, or Heroku. The backend will serve the built frontend and the `/api/contact` endpoint.

- Build command: `npm install && npm run build`
- Start command: `npm start`

If you use Render, you can add environment variables in the Render dashboard:

- `EMAIL_USER`
- `EMAIL_APP_PASSWORD`

Then your app will run at a public URL and the contact form will work for anyone.

### Option B: Keep GitHub Pages for frontend and deploy backend separately

1. Deploy backend to a Node host.
2. Set `VITE_API_URL` to the public backend URL in a `.env` file or build command.
3. Build the frontend for GitHub Pages:
   ```bash
   npm run build:gh
   ```
4. Deploy the frontend to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Environment variables

Use a `.env` file for local development (not committed):

```env
VITE_API_URL=http://localhost:5000
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password
```

When deploying to a host, configure these values in the host's environment settings.
