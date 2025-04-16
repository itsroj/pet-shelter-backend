# 🐾 Once Upon a Paw (Animal Shelter Web App)

A modern full-stack web application designed to manage an animal shelter's content and community interactions. The app provides a user-friendly interface for both visitors and administrators, with clear separation of roles and a responsive design.

## 🚀 Tech Stack

### 🖥 Frontend
- **React** (with Hooks and Context API)
- **Vite** (for fast development and hot module replacement)
- **React Router DOM** (for client-side routing)
- **Mantine UI** (component library for accessible and responsive UI)
- **Axios** (HTTP client for API communication)
- **LocalStorage** (token-based authentication handling)

### 🌐 Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT (JSON Web Token)** for secure authentication
- **Custom Middleware** for:
  - Authentication
  - Authorization (admin/user roles)
  - Input validation

## 🧩 Core Features

### 🐶 Animals Management
- Browse animals by type (dogs, cats, mixed breed)
- Detailed profile page for each animal
- Search and filter animals
- **Admin-only**:
  - Add new animals with images and full descriptions
  - Edit existing animal information
  - Delete animals

### 📚 Article Management
- Public blog-style article list and full post view
- Markdown-style rich text support (optional)
- **Admin and User**:
  - Create new articles
  - Edit articles
  - Delete articles

### 🔐 Authentication & Authorization
- Login and session management via JWT
- Role-based access control
- Protected routes for admin features

### 🌈 UX/UI
- Responsive design for mobile and desktop
- Clean, intuitive interface

## 📁 Project Structure (Frontend)

src/ ├── components/ ├── contexts/ ├── pages/ └── App.jsx
## 📁 Project Structure (Backend)

server/ ├── error-handling/ ├── middlewares/ ├── models/ ├── routes/ ├── config/ └── app.js

This project demonstrates best practices in modern full-stack development, combining a powerful backend with a polished frontend experience.
