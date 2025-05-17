# CAMP Platform

A modern platform connecting customers with contractors, built with React, Firebase, and Tailwind CSS.

## Features

- User authentication (sign up/login)
- Role-based access (customer/contractor)
- Modern, responsive UI
- Firebase integration for authentication and data storage

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account and project

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React
- React Router
- Firebase (Authentication, Firestore)
- Tailwind CSS
- Vite
