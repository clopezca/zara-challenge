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

## Features implemented

- Product list with responsive grid (mobile, tablet, desktop)
- Real-time search by name or brand (min. 3 characters, debounced)
- Results counter
- Loading bar animation while fetching data
- Error state when API fails
- Fade-in animation on product grid load
- Product detail with dynamic image, storage and color selectors
- Price updates based on selected storage
- Add to cart button — active only when color and storage are selected
- Specifications table
- Similar products with horizontal scroll and custom scroll indicator
- Back button navigation
- Sticky navbar and search input

## API

All requests are authenticated via `x-api-key` header, handled centrally in `src/services/api.client.ts`.

### Known API behaviors

- The `/products` endpoint returns a duplicate entry for `XMI-RN13P5G`. The application deduplicates by `id` before rendering.
- Brand names are inconsistent in casing (e.g. `"Xiaomi"` vs `"XIAOMI"`). Search normalization handles this with `toLowerCase()`.
- Responses are cached by the API (`Cache-Control: public, max-age=300`).
