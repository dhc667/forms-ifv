# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### GitHub Pages Deployment

This application is configured for deployment to GitHub Pages as a static SPA.

#### Prerequisites
- A GitHub repository
- GitHub Pages enabled for the repository

#### Configuration
1. Update the base path in `vite.config.ts` to match your repository name:
   ```typescript
   base: '/forms-front/', 
   ```

2. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Select "GitHub Actions" as the source

#### Automated Deployment
The application includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the main branch.

#### Manual Deployment
To deploy manually:

```bash
# Install dependencies
pnpm install

# Build the application
pnpm build

# Deploy to GitHub Pages
pnpm deploy
```

The build process will:
- Generate static assets in `build/client/`
- Copy `index.html` to `404.html` for SPA routing
- Deploy the client directory to GitHub Pages

#### Repository Configuration
Make sure your GitHub repository has Pages enabled and is configured to deploy from the `gh-pages` branch or GitHub Actions.

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
