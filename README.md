# CourseGen AI 🎓

CourseGen AI is an AI-powered course generation platform that allows users to instantly create structured, comprehensive learning materials on any topic. 

By simply providing a topic and a difficulty level, the platform generates a full syllabus complete with modules, detailed topics, and supplementary resources.

## ✨ Features

- **AI Course Generation**: Automatically generate course structures, modules, and rich topic content using advanced LLMs (powered by Groq).
- **Premium Reading Experience**: A beautiful, distraction-free reading interface for consuming generated course content, featuring markdown rendering, syntax highlighting, and reading progress indicators.
- **Progress Tracking**: Keep track of your learning journey with topic completion tracking.
- **Resource Recommendations**: Automatically curated links and resources for further reading.
- **User Authentication**: Secure user authentication and session management.

## 🛠️ Technology Stack

This project is structured as a full-stack monorepo managed with `pnpm workspaces`.

### Frontend (`apps/web`)
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State & Data Fetching**: TanStack Query (React Query), React Router v7
- **Forms & Validation**: React Hook Form, Zod

### Backend (`apps/api`)
- **Framework**: NestJS 11
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: AI SDK (`@ai-sdk/groq`) for lightning-fast text generation
- **Validation**: `nestjs-zod`
- **Security**: Custom session-based auth with Argon2 password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- `pnpm` package manager
- PostgreSQL database
- Groq API Key

### Installation

1. Install dependencies from the root directory:
   ```bash
   pnpm install
   ```

2. Set up the environment variables:
   - Create a `.env` file in `apps/api` with your PostgreSQL `DATABASE_URL` and `GROQ_API_KEY`.
   - Create a `.env` file in `apps/web` for frontend API URLs (if required).

3. Run database migrations:
   ```bash
   cd apps/api
   npx prisma db push
   # or npx prisma migrate dev
   ```

4. Start the development servers:
   ```bash
   # From the root of the project
   pnpm run dev
   ```

   This command uses `concurrently` to start both the NestJS API server and the Vite web client.

## 📁 Project Structure

- `apps/web/`: The React frontend application.
- `apps/api/`: The NestJS backend application.

## 📄 License

This project is proprietary and unlicensed.
