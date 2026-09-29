import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Map all top-level files and directories in src/ as aliases to support NODE_PATH=src/
const srcDir = path.resolve(__dirname, 'src')
const srcEntries = fs.readdirSync(srcDir)
const srcAliases = {}
srcEntries.forEach((entry) => {
  const name = entry.replace(/\.(js|css)$/, '')
  srcAliases[name] = path.resolve(srcDir, entry)
})

export default defineConfig({
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.includes('src/') || !id.endsWith('.js')) return null
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
    react(),
    {
      name: 'mock-api-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/errors' || req.url === '/api/errors.json') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({}))
            return
          }
          if (req.url === '/api/vehicle' || req.url === '/api/vehicle.json') {
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                vehicle_year: '2015',
                vehicle_make: 'Honda',
                vehicle_model: 'Fit LX',
              })
            )
            return
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: srcAliases,
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    keepNames: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      keepNames: true,
    },
  },
})
