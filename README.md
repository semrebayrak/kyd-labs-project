# kyd-labs-project

This project contains a **serverless backend** (AWS Lambda, DynamoDB, S3) and a **React frontend** (Vite, TailwindCSS) for uploading and mapping CSV files.

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/semrebayrak/kyd-labs-project
cd kyd-labs-project
```

# Install backend dependencies

cd backend
npm install

# Install frontend dependencies

cd ../frontend
npm install

Frontend .env
VITE_BACKEND_URL=https://your-api-url

# Start backend locally with Serverless Offline

cd backend
serverless offline

# Start frontend with Vite

cd ../frontend
npm run dev

```

## Usage

### 1. Upload CSV

    - Go to the frontend application
    - Click on the "Upload CSV" button
    - Select a CSV file to upload
    - Click on the "Upload" button
    - Map the columns to the fields
    - Click on the "Confirm" button
    - The shared link will be displayed



```
