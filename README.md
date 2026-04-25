# 🚀 SYRAXO Learning Platform

SYRAXO is a next-generation, AI-powered EdTech platform designed to provide interactive learning experiences for students, complete with gamified tracking, AI-assisted guidance, and live mentorship capabilities. 

## ✨ Features

- **🛡️ Secure Authentication:** Powered by Supabase for safe and seamless student enrollment and login.
- **🤖 AI Sensei Chatbot:** An integrated AI tutor connected via an n8n webhook and OpenAI to answer student questions intelligently and safely.
- **📈 Gamified Progression:** Tracks student Level and XP to make learning engaging and rewarding.
- **👨‍🏫 Mentor Guidance:** Students can discover, filter, and book live Zoom sessions with expert mentors directly through the platform.
- **💻 Live Classes & Creativity Lab:** Centralized hubs for students to join scheduled live classes and submit their interactive projects.

## 🛠️ Technology Stack

- **Frontend:** React, TypeScript, Vite
- **UI & Styling:** Tailwind CSS, shadcn/ui components
- **Authentication:** Supabase Auth
- **Backend Automation & AI:** n8n Workflows (Webhooks & Airtable Integration)
- **Database:** Airtable (via n8n) & Supabase

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AryanRaikwar312/Team---Turbo-Ai.git
```

2. Install the dependencies:
```bash
npm install
```
*(Alternatively, you can use `bun install` or `yarn install`)*

3. Set up your Environment Variables:
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

## 🔗 Integrations

The platform relies on several n8n webhooks to automate data flows:
- **`/webhook-test/enrollment`**: Triggers upon new student signup to save data to Airtable and send a welcome email.
- **`/webhook-test/ai-chat`**: Triggers when a student asks a question to the AI Sensei. Processes the prompt via OpenAI and logs the conversation in Airtable.
- **Mentor Bookings (Planned)**: Automates Zoom link generation and Mentor notification upon student booking.

---
*Built with ❤️ for the future of learning.*
