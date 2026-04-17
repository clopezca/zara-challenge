# Mobile phone catalog

A web application for browsing, searching and managing a mobile phone catalog, built as part of a technical challenge.

## Tech stack

- **React 19** with TypeScript
- **Vite** — dev and production build tool
- **React Router v7** — client-side routing
- **SASS** — styling with CSS custom properties
- **Vitest + React Testing Library** — unit and component testing
- **ESLint + Prettier** — linting and formatting

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone
cd zara-challenge
npm install
```

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm run build
npm run preview
```

## Environment variables

Create a `.env.local` file in the root of the project:

```
VITE_API_URL=your_api_url
VITE_API_KEY=your_api_key
```

### Run tests

```bash
npm run test
```

### Lint and format

```bash
npm run lint
npm run format
```
