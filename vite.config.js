import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves a PROJECT site at https://<user>.github.io/<repo>/,
// so assets must be requested from "/<repo>/". The deploy workflow sets
// BASE_PATH to "/<repo>/" automatically. Locally it falls back to "/".
//
// If you deploy to a USER/ORG site (a repo literally named
// <user>.github.io), set BASE_PATH to "/" in the workflow instead.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
});
