# SamsCloak Frontend

Vue 3 frontend application for the SamsCloak job application orchestrator.

## Tech Stack

- Vue 3 with Composition API and Script Setup
- Vite for build tooling
- Tailwind CSS for styling
- Pinia for state management
- Axios for API communication

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:5173

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Vue components
├── services/       # API services
├── stores/         # Pinia stores
├── assets/         # Static assets
└── main.js         # Application entry point
```

## Features

- Upload job posting screenshots
- View job applications with AI analysis
- Generate tailored resumes
- Generate cover letters
- Track application status
- Search and filter applications
