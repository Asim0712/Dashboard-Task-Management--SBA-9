# Task Dashboard Management 
## React + TypeScript + Vite + Javascript + Tailwind

 **[Project link]**[https://dashboard-task-managemnt.netlify.app]



## Overview
In this assessment, you will apply the skills you have developed throughout your React training to build a functional, real-world dashboard application. This project will test your understanding of React components, state management, TypeScript integration, form handling, and component composition.

You will create a Task Management Dashboard using React and TypeScript. The final deliverable will include a GitHub repository with your project and a written reflection on your approach and the challenges you faced.

## Installation

### Create a new React TypeScript project using Vite:
```js
npm create vite@latest task-dashboard -- --template react-ts
cd task-dashboard
npm install
```

### Tailwind Installation
```js
npm install tailwindcss @tailwindcss/vite
```
### Configure the Vite plugin
```js
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```
### Import Tailwind in your CSS file
```js
/* src/index.css */
@import "tailwindcss";
```

## Project Structure
```js
task-dashboard/
├── src/
│   ├── components/
│   │   ├── TaskList/
│   │   │   ├── TaskList.tsx
│   │   │   └── TaskItem.tsx
│   │   ├── TaskForm/
│   │   │   └── TaskForm.tsx
│   │   ├── TaskFilter/
│   │   │   └── TaskFilter.tsx
│   │   └── Dashboard/
│   │       └── Dashboard.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── taskUtils.ts
│   ├── App.tsx
├── main.tsx
└── package.json
```
## Features
- Add, update, delete tasks
- Form validation and feedback
- Filtering by status, priority, and search
- Responsive layout with Tailwind CSS
- Dashboard statistics (completed, pending, etc.)
- LocalStorage persistence
- Type-safe code using custom interfaces
- Clean and modular component architecture

## Deployment
- **[GitHub Repo]** [https://github.com/Asim0712/Dashboard-Task-Management--SBA-9]
- **[Project link]**[https://dashboard-task-managemnt.netlify.app/]

## Author:  Asim Daud Khan


## Acknowledgments
Created by Asim Daud Khan as part of Module 9, Skills-Based Assessment to test my understaning of React components, state management, Typescript integration, form handling, and component composition.

Feedback and suggestions are welcome!

### Thank You

