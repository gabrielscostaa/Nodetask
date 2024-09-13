import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
      },
    },
  },
  server: {
    fs: {
      // Permitir acesso à pasta node_modules e qualquer caminho necessário
      allow: [
        'C:/Users/gabri/OneDrive/Desktop/Node brincadeira/frontend', // Caminho raiz do projeto
        'C:/Users/gabri/OneDrive/Desktop/Node brincadeira/frontend/node_modules'  // Caminho para node_modules
      ]
    }
  },
  optimizeDeps: {
    include: ['chart.js/auto', 'quill']
  },
  resolve: {
    alias: {
      '@components': '/src/components', // Ajuste o caminho conforme a estrutura do seu projeto
    }
  }
});
