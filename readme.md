# 💸 Expense Tracker — Backend API

A RESTful API for the Expense Tracker app, built with **Express.js**, **TypeScript**, and **MongoDB**.

🌐 **Live API:** [https://your-backend.vercel.app](https://your-backend.vercel.app)

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Express.js | HTTP server & routing |
| TypeScript | Type safety |
| MongoDB | Database |
| dotenv | Environment variables |
| CORS | Cross-origin requests |

---

## 📡 API Endpoints

### Base URL
```
https://your-backend.vercel.app
```

---

### GET `/api/expense`
সব expense আনে। Optional query দিয়ে filter করা যায়।

**Query Parameters:**

| Parameter | Type | Example |
|-----------|------|---------|
| `category` | string | `Food`, `Transport`, `Shopping`, `Others` |
| `date` | string | `2025-01-15` |

**Example Request:**
```
GET /api/expense?category=Food&date=2025-01-15
```

**Example Response:**
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "title": "Lunch",
    "amount": 150,
    "category": "Food",
    "date": "2025-01-15"
  }
]
```

---

### POST `/api/expense`
নতুন expense তৈরি করে।

**Request Body:**
```json
{
  "title": "Rickshaw fare",
  "amount": 50,
  "category": "Transport",
  "date": "2025-01-15"
}
```

**Example Response:**
```json
{
  "acknowledged": true,
  "insertedId": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

---

### PATCH `/api/expense/:id`
Expense আপডেট করে।

**Example Request:**
```
PATCH /api/expense/64f1a2b3c4d5e6f7a8b9c0d1
```

**Request Body:**
```json
{
  "title": "Dinner",
  "amount": 200
}
```

**Example Response:**
```json
{
  "acknowledged": true,
  "modifiedCount": 1
}
```

---

### DELETE `/api/expense/:id`
Expense ডিলিট করে।

**Example Request:**
```
DELETE /api/expense/64f1a2b3c4d5e6f7a8b9c0d1
```

**Example Response:**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

---

## 🚀 Local Setup

### 1. Clone & Install

```bash
git clone https://github.com/your-username/expense-tracker-backend.git
cd expense-tracker-backend
npm install
```

### 2. Environment Variables

`.env` ফাইল তৈরি করো:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Run

```bash
npm run dev
```

Server চলবে → `http://localhost:5000`

---

## ☁️ Deploy on Vercel

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.ts",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}
```

Vercel Dashboard এ Environment Variable যোগ করো:
```
MONGODB_URI = your_mongodb_connection_string
```

---

## 🧑‍💻 Author

**Mohiuddin**
GitHub: [@muhiuddinshanto](https://github.com/muhiuddinshanto)

---

## 📄 License

[MIT](./LICENSE)