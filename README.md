# CourseNest

A modern online learning platform for developers and creators — featuring smooth UI, responsive design, and a powerful course management system.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation️ & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
- [Contributions](#contributions)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Contact](#contact)

---

## About the Project

CourseNest is a premium online learning platform designed to help instructors share knowledge and students learn efficiently. The project focuses on creating a smooth UI/UX experience with robust authentication, course handling, reviews, and dashboards for both learners and instructors.

---

## Project Overview

CourseNest provides a clean and responsive interface where users can browse courses, enroll, and interact with instructors.  
It includes:

- Dynamic dashboards
- Role-based content rendering
- Inline reviews & ratings
- Secure authentication
- Modern animations and micro-interactions

**Live URL:** [https://](https://course-nest-6d3e1.web.app/)

---

## Key Features

- **User Authentication**  
  Secure login & registration with Firebase Auth + Google Sign-In.

- **Course Management**  
  Instructors can add, update, feature, and delete their own courses.

- **Enrollment System**  
  Students can enroll in courses and track their progress.

- **Review & Rating**  
  Inline review editing, deletion, and dynamic average rating calculation.

- **Responsive Design**  
  Fully mobile-friendly UI with dark mode and smooth animations.

- **Image Upload**  
  Secure image hosting using imgbb integration.

- **Dashboard Experience**  
  Role-based dashboards for instructors and students with clean navigation.

---

## Tech Stack

**Frontend:** React (Vite) · Tailwind CSS · DaisyUI · AOS · Framer Motion  
**Backend:** Express.js · MongoDB · JWT  
**Tools:** Firebase Auth · Axios · imgbb · React Router

---

## Dependencies

```json
{
  "@tailwindcss/vite": "^4.1.17",
  "aos": "^2.3.4",
  "axios": "^1.13.2",
  "firebase": "^12.5.0",
  "framer-motion": "^12.23.24",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-hot-toast": "^2.6.0",
  "react-icons": "^5.5.0",
  "react-router": "^7.9.5",
  "recharts": "^3.4.1",
  "sweetalert2": "^11.26.3",
  "swiper": "^12.0.3",
  "tailwindcss": "^4.1.17"
}
```

## Installation️ & Setup

```bash
git clone https://github.com/your-username/CourseNest
cd resume-CourseNest
npm install
```

2. Set up environment variables by creating a `.env` file in the root directory:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id

VITE_IMGBB_KEY=your_imgbb_key
VITE_BASE_URL=your_backend_url

```

3. Run the application:

```bash
npm run dev
```

## Folder Structure

```
CourseNest/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── routes/
│   ├── context/
│   └── utils/
├── public/
└── package.json
```

4. Contributions

| Name                | Role                | Contributions                       |
| ------------------- | ------------------- | ----------------------------------- |
| Tanvir Hussain Khan | Fullstack Developer | Entire project design & development |

## 📞 Contact

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-000?style=for-the-badge)](https://course-nest-6d3e1.web.app)
[![Email](https://img.shields.io/badge/📧_Email-tkdarkshadow@gmail.com-000?style=for-the-badge)](mailto:tkdarkshadow@gmail.com)
[![GitHub](https://img.shields.io/badge/💻_GitHub-tanvir81-000?style=for-the-badge)](https://github.com/tanvir81)
