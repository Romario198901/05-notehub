# NoteHub

A small notes application built with React, TypeScript and Vite. This repository contains a client-side app for creating, searching, paginating, and managing notes.

## Features

- Create, edit, and delete notes
- Search notes with a search box
- Paginated note list
- Modal-based note form
- Lightweight, client-side only (no backend required by default)

## Tech Stack

- Vite
- React (with TypeScript)
- CSS Modules

## Getting Started

Prerequisites: Node.js (>=16) and npm or pnpm.

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

- `index.html` — App entry HTML
- `src/main.tsx` — App bootstrap
- `src/components/` — React components
  - `App/` — Root `App` component
  - `NoteForm/` — Modal form for creating/editing notes
  - `NoteList/` — List and item rendering
  - `SearchBox/` — Search input
  - `Pagination/` — Pagination controls
  - `Modal/`, `Loader/`, `Error/` — UI utilities
- `src/services/noteService.ts` — Note handling logic
- `src/types/note.ts` — Type definitions

## Development Notes

- The app uses CSS Modules (files named `*.module.css`) for scoped styles.
- The Vite config is in `vite.config.ts`.
- TypeScript configs are `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json`.

## Running Tests

No test suite is included by default. Add tests with your preferred test runner.

## Contributing

Feel free to open issues or submit pull requests. For large changes, open an issue first to discuss the plan.


