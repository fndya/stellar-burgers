# 🍔 Stellar Burgers

A modern single-page application for building custom burgers with authentication, personal account, and real-time order management.

> Educational project focused on React ecosystem, Redux Toolkit, routing, state management, and REST API integration.


---

## ✨ Features

- 🍔 Burger constructor
  - Add ingredients
  - Replace buns
  - Remove ingredients
  - Reorder ingredients
  - Automatic price calculation

- 🔐 Authentication
  - Registration
  - Login
  - Logout
  - Protected routes
  - JWT authentication
  - Automatic access token refresh

- 👤 User profile
  - View profile information
  - Edit user data
  - Reset changes
  - Save updated profile

- 📦 Orders
  - Create orders
  - Order history
  - Order details
  - Feed with live order statistics

- 🧭 Routing
  - Nested routes
  - Dynamic routes
  - Modal routing
  - Protected routes
  - Redirect after authentication

---

## 🛠 Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white) 

- Redux Thunk (createAsyncThunk)
- CSS Modules
- REST API
- ESLint
- Prettier

---

# 📁 Project Structure

```
src/
├── components/
├── pages/
├── services/
│   ├── slices/
│   └── store.ts
├── utils/
└── index.tsx
```

---

# 🏗 Architecture

The application follows a scalable architecture:

- UI and container components separation
- Global state managed with Redux Toolkit
- Feature-based Redux slices
- Typed Redux hooks
- Local state only for forms and temporary UI
- Async API requests handled with createAsyncThunk

---

# 📦 Redux State

The application uses separate slices for:

- Ingredients
- Burger Constructor
- Orders
- User Authentication
- User Profile
- Feed

Each slice handles:

- loading state
- success state
- error state

---

# 🔐 Authentication

Authentication includes:

- JWT access token
- Refresh token
- Automatic token refresh
- Protected pages
- Redirect back after login

---

# 🚀 Getting Started

Clone repository

```bash
git clone https://github.com/your_username/stellar-burgers.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm start
```

Build production version

```bash
npm run build
```

---


# 🎯 Learning Goals

This project was built to practice:

- React architecture
- TypeScript
- Redux Toolkit
- React Router
- REST API integration
- Authentication flow
- State management
- Component composition
- Production-ready frontend practices

---

# 📄 License

This project was created for educational purposes.