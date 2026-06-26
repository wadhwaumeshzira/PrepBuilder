# 🚀 PrepBuilder: AI-Powered Interview Preparation Platform

<img width="1918" height="972" alt="Screenshot 2026-06-26 013137" src="https://github.com/user-attachments/assets/e7ea0611-75f6-4c50-9c3b-766b30e21ba3" />


[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini API](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

**PrepBuilder** is a full-stack, AI-driven application designed to help job seekers crack their interviews. By analyzing a candidate's resume, tech stack, and target role, PrepBuilder generates highly customized, exhaustive interview preparation reports—including core technical questions, system design challenges, DSA problems, and actionable resume optimization advice.

🌐 **Live Demo:** [https://prep-builder.vercel.app](https://prep-builder.vercel.app)

---

## ✨ Key Features

- **🧠 Deep AI Integration:** Powered by Google's Gemini API to generate hyper-relevant interview questions and technical challenges based on the user's specific resume and target role.
- **📄 Instant PDF Reports:** Seamlessly converts AI-generated markdown reports into beautiful, downloadable PDFs using headless Chromium (Puppeteer).
- **🔒 Secure Authentication:** Full JWT-based authentication system with secure HTTP-only cookies and bcrypt password hashing.
- **💼 Comprehensive Assessments:** Generates categorized questions including Core Technologies, System Design, Data Structures & Algorithms, and Behavioral.
- **📈 Resume Optimization:** AI scans the provided resume against the target role to provide actionable "Advice to Optimize" and increase callback chances.
- **☁️ Cloud-Native & Dockerized:** Fully containerized backend designed for seamless deployment on cloud platforms like Render, Railway, or Koyeb.

---

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)** - Blazing fast frontend framework
- **Vanilla CSS** - Custom, premium, and responsive UI design with dynamic animations
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js & Express.js** - Robust RESTful API architecture
- **MongoDB & Mongoose** - Flexible NoSQL database for user and report management
- **Puppeteer** - Headless browser automation for high-quality PDF generation
- **Google Generative AI SDK** - Integration with the Gemini AI model
- **JSON Web Tokens (JWT)** - Secure, stateless user authentication
- **Docker** - Containerization for reliable, cross-platform cloud deployments

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas Account (or local MongoDB)
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/wadhwaumeshzira/PrepBuilder.git
cd PrepBuilder
```

### 2. Setup the Backend
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
```bash
# Open a new terminal tab
cd Frontend
npm install
```
Create a `.env` file in the `Frontend` directory:
```env
VITE_API_URL=http://localhost:3000
```
Start the frontend development server:
```bash
npm run dev
```

---

## ☁️ Deployment Architecture

This application is configured for a robust, decoupled cloud deployment:

- **Frontend:** Deployed to **Vercel** for ultra-fast global edge delivery.
- **Backend:** Deployed to **Render** using a custom `Dockerfile` to ensure Puppeteer and Chromium system dependencies are correctly installed.
- **Database:** Hosted on **MongoDB Atlas** (Ensure `0.0.0.0/0` is whitelisted in Network Access for cloud environments).

**Keep-Awake Mechanism:** The backend includes a `/ping` health-check route, utilized by `cron-job.org` to prevent cold-starts on free cloud tiers.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/wadhwaumeshzira/PrepBuilder/issues).

---

## 📝 License

This project is licensed under the MIT License.
