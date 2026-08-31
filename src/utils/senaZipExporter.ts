import JSZip from "jszip";

// Load all SENA CRM files as raw strings using Vite's eager raw import
const componentFiles = import.meta.glob(
  [
    "/src/components/senaCrm/*.tsx",
    "/src/types/senaCrm.ts",
    "/src/data/senaCrmData.ts",
  ],
  { query: "?raw", import: "default", eager: true }
) as Record<string, string>;

export async function downloadSenaStandaloneZip(): Promise<void> {
  const zip = new JSZip();

  // Root project files
  zip.file(
    "package.json",
    JSON.stringify(
      {
        name: "sena-crm-imobiliario",
        private: true,
        version: "1.0.0",
        type: "module",
        scripts: {
          dev: "vite --port 3000 --host",
          build: "tsc -b && vite build",
          preview: "vite preview --port 3000",
        },
        dependencies: {
          "lucide-react": "^0.546.0",
          react: "^19.0.0",
          "react-dom": "^19.0.0",
        },
        devDependencies: {
          "@tailwindcss/vite": "^4.1.14",
          "@types/react": "^19.0.0",
          "@types/react-dom": "^19.0.0",
          "@vitejs/plugin-react": "^5.0.0",
          tailwindcss: "^4.1.14",
          typescript: "~5.8.2",
          vite: "^6.2.0",
        },
      },
      null,
      2
    )
  );

  zip.file(
    "vite.config.ts",
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true,
  },
});
`
  );

  zip.file(
    "tsconfig.json",
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          useDefineForClassFields: true,
          lib: ["ES2022", "DOM", "DOM.Iterable"],
          module: "ESNext",
          skipLibCheck: true,
          moduleResolution: "bundler",
          allowImportingTsExtensions: false,
          resolveJsonModule: true,
          isolatedModules: true,
          moduleDetection: "force",
          noEmit: true,
          jsx: "react-jsx",
          strict: true,
          noUnusedLocals: false,
          noUnusedParameters: false,
          noFallthroughCasesInSwitch: true,
        },
        include: ["src"],
      },
      null,
      2
    )
  );

  zip.file(
    "index.html",
    `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2'><path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/><polyline points='9 22 9 12 15 12 15 22'/></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CRM Imobiliário SENA 2026</title>
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  zip.file(
    "src/index.css",
    `@import "tailwindcss";

@layer base {
  body {
    background-color: #020617;
    color: #f8fafc;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }
}
`
  );

  zip.file(
    "src/main.tsx",
    `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
  );

  zip.file(
    "src/App.tsx",
    `import React from 'react';
import { SenaCrmApp } from './components/senaCrm/SenaCrmApp';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SenaCrmApp />
    </div>
  );
}

export default App;
`
  );

  zip.file(
    "README.md",
    `# CRM Imobiliário SENA 2026 (Projeto Standalone Isolado)

Sistema de Gestão Imobiliária Completo: Vendas, Locações, Loteamentos, Comissões e Corretores.

---

## 🚀 Como Executar Localmente

### 1. Requisitos
- **Node.js**: Versão 18 ou superior instalado ([nodejs.org](https://nodejs.org))
- **NPM** ou **Yarn** ou **PNPM**

### 2. Instalar Dependências
Abra o terminal dentro da pasta descompactada e execute:
\`\`\`bash
npm install
\`\`\`

### 3. Rodar em Modo de Desenvolvimento
\`\`\`bash
npm run dev
\`\`\`
O sistema estará rodando em: \`http://localhost:3000\`

---

## 🌐 Como Publicar em Qualquer Domínio / Hospedagem

### Opção 1: Vercel (Recomendado - Grátis e Fácil)
1. Crie uma conta em [vercel.com](https://vercel.com).
2. Suba essa pasta no seu GitHub ou importe diretamente na Vercel.
3. O comando de build automático é \`npm run build\` e a pasta de saída é \`dist\`.
4. Conecte o seu domínio personalizado (ex: \`crm.seudominio.com.br\`) nas configurações de domínio da Vercel.

### Opção 2: Netlify
1. Acesse [netlify.com](https://netlify.com).
2. Arraste a pasta gerada após rodar \`npm run build\` (pasta \`dist\`) ou conecte ao repositório Git.
3. Aponte seu domínio.

### Opção 3: Servidor Próprio / VPS / Apache / Nginx / Hostinger / cPanel
1. Execute no terminal do seu computador:
\`\`\`bash
npm run build
\`\`\`
2. Será gerada a pasta \`dist\` com todos os arquivos estáticos compilados (HTML, CSS, JS otimizados).
3. Envie o conteúdo de dentro da pasta \`dist\` para a raiz do seu servidor web (ex: \`public_html\` ou \`/var/www/html\`).
4. Se usar Nginx ou Apache com roteamento SPA, configure fallback para \`index.html\`.

---

## 📦 Estrutura de Arquivos

- \`src/types/senaCrm.ts\`: Tipagens TypeScript completas de Leads, Imóveis, Lotes, Comissões, etc.
- \`src/data/senaCrmData.ts\`: Base inicial de dados e cadastros.
- \`src/components/senaCrm/\`: Todos os 15 módulos do CRM Imobiliário SENA.
`
  );

  // Add all components, types, and data files
  for (const [path, content] of Object.entries(componentFiles)) {
    // Convert "/src/components/senaCrm/..." to "src/components/senaCrm/..."
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    zip.file(cleanPath, content);
  }

  // Generate the zip blob and trigger browser download
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `crm-imobiliario-sena-2026-standalone.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
