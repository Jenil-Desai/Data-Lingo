# 🎉 Welcome to **DataLingo** - Your AI-Powered Text-to-SQL Companion 🎉

Transforming the way you interact with databases, one conversation at a time! 🚀

---

## 🌟 What is DataLingo?

**DataLingo** is an intelligent service that allows you to communicate with your databases using simple natural language. Forget about writing complex SQL queries—just ask DataLingo, and it will do the heavy lifting for you!

**Supports**:

- 🐬 **MySQL**
- 🐘 **PostgreSQL**
- 🏛️ **Oracle**

---

## ✨ Key Features

- **Effortless Database Management**: Connect and manage multiple databases with ease.
- **Natural Language Processing**: Turn plain text into SQL queries automatically.
- **Schema-Aware Intelligence**: Tailored responses based on your database schema.
- **Interactive Chat Interface**: Engage with your data through a chat-based UI.
- **Real-Time Data Visualization**: See query results in an instant, beautifully formatted as tables.
- **Secure & Scalable**: Built with security in mind, ready to grow with your needs.

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v14.x or later)
- **PostgreSQL** (v12.x or later)
- **Docker** (optional, for deployment)
- **Oracle Client Libraries** (for Oracle DB support)

### ⚙️ Installation Steps

1. **Clone the Repo**:

   ```bash
   git clone https://github.com/Jenil-Desai/Data-Lingo.git
   cd Data-Lingo
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory with your configurations:

   ```plaintext
   DATABASE_URL=postgresql://username:password@localhost:5432/datalingo
   JWT_SECRET=your_secret_key
   ```

4. **Run Migrations**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the Service**:
   ```bash
   npm run dev
   ```

---

## 🛠️ API Overview

### 🔐 Authentication

- **Sign Up**: `POST /api/auth/signup`
- **Log In**: `POST /api/auth/login`

### 🌐 Database Connections

- **Add Connection**: `POST /api/db/connect`
- **List Connections**: `GET /api/db/connections`
- **Delete Connection**: `DELETE /api/db/connection/:id`

### 💬 Chat & Queries

- **Start Chat**: `POST /api/chat/start`
- **Send Query**: `POST /api/chat/:id/query`
- **Get Chat History**: `GET /api/chat/:id`

---

## 🖥️ Frontend Setup

### ⚡ Quick Start

1. **Navigate to the Frontend Directory**:

   ```bash
   cd frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Frontend**:
   ```bash
   npm run dev
   ```

---

## 🐳 Deployment with Docker ![Coming Soon](https://img.shields.io/badge/Coming%20Soon-pink)

1. **Build the Docker Images**:

   ```bash
   docker-compose build
   ```

2. **Start the Services**:

   ```bash
   docker-compose up -d
   ```

3. **Access the Application**:
   - **Frontend**: `http://localhost:3000`
   - **Backend API**: `http://localhost:4000`

---

## 💡 Contribution Guide ![Coming Soon](https://img.shields.io/badge/Coming%20Soon-pink)

Want to make DataLingo even better? Here's how you can contribute:

1. **Fork the Repo**
2. **Create a New Branch** (`git checkout -b feature-branch`)
3. **Commit Your Changes** (`git commit -m 'Add some feature'`)
4. **Push to the Branch** (`git push origin feature-branch`)
5. **Submit a Pull Request**

We welcome all contributions, from bug fixes to new features! 🌟

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

For support or inquiries, feel free to reach out:

- **Email**: [jenildev91@gmail.com](mailto:jenildev91@gmail.com)
- **LinkedIn**: [Jenil Desai](https://www.linkedin.com/in/desaijenil/)

---

**DataLingo** - Making database management conversational and intuitive. Start your journey with us today! 🌐
