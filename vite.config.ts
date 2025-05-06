import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "MuiOutlinedPhoneInput",
      fileName: (format) => `mui-outlined-phone-input.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
