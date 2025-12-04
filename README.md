# UKLBackendPaket1-2025 ☕

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

A RESTful API Backend for Coffee Shop Management System | Sistem Backend untuk Manajemen Kedai Kopi

**Project for school examination (UKL) 2025**

---

## 📖 Description / Deskripsi

**EN:** A comprehensive backend system for managing coffee shop operations including menu management, transaction processing, user authentication with role-based access (Admin & Cashier), and detailed sales reporting capabilities.

**ID:** Sistem backend lengkap untuk mengelola operasional kedai kopi termasuk manajemen menu, pemrosesan transaksi, autentikasi pengguna dengan akses berbasis role (Admin & Kasir), dan kemampuan laporan penjualan yang detail.

### 🌟 Key Features / Fitur Utama

#### 📊 Advanced Reporting System / Sistem Pelaporan Lanjutan
- **Sales Summary Report** - Total orders, revenue, and best-selling products
- **Cashier Performance Report** - Track transactions, items served, and revenue per cashier
- **Period-based Transaction Report** - Filter transactions by date range
- **Customer Order History** - Detailed order history per customer with most active cashier

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5.1.0
- **ORM:** Prisma v6.19.0
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** MD5
- **Dev Tools:** Nodemon

---

## 📋 Prerequisites / Prasyarat

Make sure you have installed: / Pastikan sudah terinstal:

- Node.js (v18 or higher / v18 atau lebih tinggi)
- MySQL Database
- npm or yarn

---

## 🚀 Installation / Instalasi

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd UKLBackendPaket12025
```

### 2️⃣ Install Dependencies / Instal Dependensi

```bash
npm install
```

### 3️⃣ Environment Setup / Pengaturan Environment

Create `.env` file in root directory: / Buat file `.env` di root directory:

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
JWT_SECRET="your_secret_key_here"
PORT=3000
```

> **Note:** Update the DATABASE_URL with your MySQL credentials / Perbarui DATABASE_URL dengan kredensial MySQL Anda

### 4️⃣ Database Setup / Pengaturan Database

Run Prisma migrations: / Jalankan migrasi Prisma:

```bash
npx prisma migrate dev
```

### 5️⃣ Seed Database / Isi Database dengan Data Awal

```bash
npm run seed
```

This will create: / Ini akan membuat:
- 5 Admin users (admin1-admin5)
- 5 Cashier users (cashier1-cashier5)
- 20 Coffee menu items
- 10 Sample transactions

### 6️⃣ Run Development Server / Jalankan Server Development

```bash
npm run dev
```

Server will run on: / Server akan berjalan di: `http://localhost:3000`

---

## 🔐 Default Credentials / Kredensial Default

After seeding, you can login with: / Setelah seeding, Anda bisa login dengan:

**Admin Account:**
```
Username: admin1 (to admin5)
Password: admin1123 (to admin5123)
```

**Cashier Account:**
```
Username: cashier1 (to cashier5)
Password: cashier1123 (to cashier5123)
```

---

## 📡 API Endpoints

### 🔑 Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login user | Public |

**Example Login Request:**
```json
{
  "name": "admin1",
  "password": "admin1123"
}
```

**Example Response:**
```json
{
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "admin1",
    "role": "admin",
    "email": "admin1@coffee.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### ☕ Coffee Menu Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/menu/coffee` | Get all coffee menu | Admin, Cashier |
| POST | `/menu/coffee` | Add new coffee item | Admin only |
| PUT | `/menu/coffee/:id` | Update coffee item | Admin only |
| DELETE | `/menu/coffee/:id` | Delete coffee item | Admin only |

---

### 🛒 Transaction Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/transactions/orders` | Get all orders | Admin, Cashier |
| POST | `/transactions/orderCreate` | Create new order | Cashier only |
| PUT | `/transactions/update/:id` | Update order | Admin, Cashier |
| DELETE | `/transactions/delete/:id` | Delete order | Admin, Cashier |

**Example Create Order Request:**
```json
{
  "customer_name": "John Doe",
  "order_type": "dine-in",
  "order_date": "2025-12-03",
  "items": [
    {
      "coffee_id": 1,
      "quantity": 2
    },
    {
      "coffee_id": 3,
      "quantity": 1
    }
  ]
}
```

---

### 👥 User Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/users/` | Get all users | Admin only |
| PUT | `/users/:id` | Update user | Admin only |
| DELETE | `/users/delete/:id` | Delete user | Admin only |

---

### 📊 Reports (Highlighted Feature)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/reports/coffee-sales` | Sales summary & cashier performance | Admin only |
| GET | `/reports/transactions-period` | Transactions by date range | Admin only |
| GET | `/reports/customer-orders?customer_name=John` | Customer order history | Admin, Cashier |

**Example Sales Report Response:**
```json
{
  "message": "Sales summary and cashier performance retrieved successfully",
  "data": {
    "sales_summary": {
      "total_orders": 10,
      "total_revenue": 450000,
      "best_selling_products": [
        {
          "coffee_name": "Latte",
          "total_sold": 15
        }
      ]
    },
    "cashier_performance": [
      {
        "cashier_id": 6,
        "cashier_name": "cashier1",
        "cashier_role": "cashier",
        "total_transactions": 5,
        "total_items_served": 12,
        "total_revenue": 280000
      }
    ]
  }
}
```

---

## 🗂️ Database Schema

### Main Tables / Tabel Utama:

- **users** - User accounts with roles (admin/cashier)
- **coffee** - Coffee menu items with stock management
- **order_list** - Order headers (customer, type, date)
- **order_detail** - Order items (coffee, quantity, price, cashier)

### Key Relationships / Relasi Utama:
- One order can have multiple items (1:N)
- Each order item references one coffee menu (N:1)
- Each order item is served by one cashier (N:1)

---

## 🎯 Role-Based Access Control

### Admin Role:
- Full access to all endpoints
- Can manage users, coffee menu, and view all reports
- Cannot create transactions

### Cashier Role:
- Can view coffee menu
- Can create and manage transactions
- Can view customer order history
- Limited access to reports

---

## 📝 Project Structure

```
UKLBackendPaket12025/
├── controllers/         # Business logic
│   ├── auth.controller.js
│   ├── coffee.controller.js
│   ├── report.controller.js
│   ├── transactions.controller.js
│   └── user.controller.js
├── middlewares/        # Authentication & validation
│   └── user-validation.js
├── routes/             # API routes
│   ├── auth.route.js
│   ├── coffee.route.js
│   ├── report.route.js
│   ├── transactions.route.js
│   └── user.route.js
├── prisma/             # Database schema & migrations
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── .env                # Environment variables
├── server.js           # Application entry point
└── package.json        # Dependencies
```

---

## 🧪 Testing the API

You can test the API using:
- **Postman** - Import collection (recommended)
- **Thunder Client** (VS Code Extension)
- **cURL** commands

Don't forget to include the JWT token in Authorization header:
```
Authorization: Bearer <your_token_here>
```

---

## 📜 License / Lisensi

This project is licensed under ISC License.

**Created by:** ArunaDaegal / Muhammad Fajar Kurniawan

---

## 📞 Contact / Kontak

For questions or issues, please contact the developer.

---

**Happy Coding! ☕✨**

Made with ❤️ for UKL 2025
