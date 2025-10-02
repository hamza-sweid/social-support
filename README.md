# Social Support Application

A multi-step React application for submitting user financial and personal information, integrated with AI (ChatGPT) for suggestions. The app supports RTL/LTR languages (Arabic and English), uses `react-hook-form` for form handling, `antd` for UI components, and `i18next` for translations.

---

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)

---

## Features
- Multi-step form:
  1. Personal Info
  2. Family Info
  3. Situation Description
- Field validations (required, number, date, etc.)
- AI-generated suggestions using ChatGPT
- Persistent form data using `localStorage` and React Context
- Responsive design (desktop, tablet, mobile)
- LTR and RTL support
- Loading spinner and form submission feedback
- Dynamic select fields with async options
- Query parameter support for step navigation
- Error handling for API calls

---

## Technologies
- **Frontend:** React, TypeScript, react-hook-form, Ant Design, i18next, Axios
- **Backend (optional):** Node.js, Express (for ChatGPT proxy)
- **Styling:** SCSS, responsive design
- **State Management:** React Context
- **Routing:** React Router DOM
- **Deployment:** GitHub Pages (frontend), Render (backend)

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/hamza-sweid/social-support.git
cd social-support


2. **Install dependencies**
npm install
# or
yarn

3. **Set up environment variables**
VITE_OPENAI_KEY=your_openai_api_key_here

4. **Run the app**
npm run dev
# or
yarn dev
