import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/portfolio_v3/", // Komt overeen met je GitHub homepage URL
  server: {
    port: 3000, // Zorgt dat je vertrouwde poort 3000 gebruikt wordt
    open: true,
  },
  build: {
    outDir: "dist", // Vite bouwt standaard naar 'dist' i.p.v. 'build'
  },
});
