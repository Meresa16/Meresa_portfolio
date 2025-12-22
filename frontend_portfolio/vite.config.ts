// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import path from "path";
// import checker from "vite-plugin-checker";
// import dns from "node:dns";

// dns.setDefaultResultOrder("verbatim");

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     checker({
//       typescript: true,
//     }),
//   ],
  
//   // --- ADDED BUILD CONFIGURATION HERE ---
//   build: {
//     // Vite's default output directory is 'dist'. We MUST change it to 'build'
//     // because Vercel is explicitly looking for a folder named 'build'.
//     outDir: 'build', 
//   },
//   // ------------------------------------

//   server: {
//     port: 3000,
//     host: true,
//     allowedHosts: true,
//   },
//   preview: {
//     port: 3000,
//     host: true,
//     allowedHosts: true,
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });














import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import checker from "vite-plugin-checker";
import dns from "node:dns";

// Read the Vercel-set environment variable
const VERCEL_RENDER_URL = process.env.VITE_RENDER_API_URL || 'http://localhost:8000';

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: true,
    }),
  ],
  
  // --- FINAL FIX: Inject the Variable as a String Literal ---
  define: {
    // This tells the compiler: "Wherever you see import.meta.env.VITE_RENDER_API_URL, 
    // replace it with the actual value as a string."
    'import.meta.env.VITE_RENDER_API_URL': JSON.stringify(VERCEL_RENDER_URL),
  },
  // --------------------------------------------------------

  build: {
    outDir: 'build', 
    chunkSizeWarningLimit: 1000,
    rollupOptions: { /* ... (chunks config) ... */ } 
  },
  
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
