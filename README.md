````markdown
# 📝 Logs

A full-stack logging application built with:

- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Node.js + Prisma
- **Database**: PostgreSQL
- **Auth**: GitHub OAuth with NextAuth.js

---

## ⚙️ Getting Started

Follow the steps below to run the project locally.

---

## 🔁 Clone the Repository

```bash
git clone https://github.com/hemanth-1321/logs
cd logs
```
````

---

## 🖥️ Setup the Client (Frontend)

```bash
cd client
pnpm install
```

### 🔐 Configure Environment Variables

Create a `.env.local` file in the `client/` directory:

```bash
touch .env.local
```

Paste the following and **replace with your actual values**:

```env
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key
```

### 🚀 Start the Frontend

```bash
npm run dev
```

---

## ⚙️ Setup the Server (Backend)

```bash
cd ../server
pnpm install
```

### 📝 Setup PostgreSQL

You have two options:

#### Option 1: Use [Neon](https://neon.tech)

- Sign up and create a new PostgreSQL instance.
- Copy the connection string.

#### Option 2: Use Docker Locally

```bash
docker run --name logs-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

---

### 🔐 Configure Backend Environment Variables

Create a `.env` file in the `server/` directory:

```bash
cp .env.example .env
```

Then update the `.env` file with your values:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/logsdb?schema=public
JWT_SECRET=your_jwt_secret
```

> ⚠️ Make sure the database name and credentials match your local or Neon setup.

---

### 🧱 Run Prisma Migrations

````bash
pnpm db:migrate

```bash
pnpm dev

## 🧰 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: Node.js, Prisma, JWT
- **Database**: PostgreSQL (via Docker or Neon)
- **Auth**: GitHub OAuth via NextAuth.js

---
````
