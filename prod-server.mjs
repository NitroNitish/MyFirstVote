import { serve } from 'srvx'
import entry from './dist/server/server.js'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CLIENT_DIR = path.join(__dirname, 'dist/client')

console.log('🚀 Starting MyFirstVote Production Server...')
console.log(`📂 Serving static files from: ${CLIENT_DIR}`)

serve({
  async fetch(request) {
    const url = new URL(request.url)
    const pathname = url.pathname
    const start = Date.now()

    // Serve static files from dist/client
    // Check if the file exists in dist/client
    const possibleFilePath = path.join(CLIENT_DIR, pathname === '/' ? 'index.html' : pathname)
    
    try {
      const stats = await stat(possibleFilePath)
      if (stats.isFile()) {
        const content = await readFile(possibleFilePath)
        const ext = path.extname(possibleFilePath).toLowerCase()
        const mimeTypes = {
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.ico': 'image/x-icon',
          '.svg': 'image/svg+xml',
          '.json': 'application/json',
          '.html': 'text/html',
          '.woff': 'font/woff',
          '.woff2': 'font/woff2',
          '.ttf': 'font/ttf'
        }
        
        console.log(`[${new Date().toISOString()}] 📄 SERVE ${pathname} (${Date.now() - start}ms)`)
        return new Response(content, {
          headers: {
            'Content-Type': mimeTypes[ext] || 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000, immutable'
          }
        })
      }
    } catch (e) {
      // Not a file, continue to TanStack Start handler
    }

    // Fallback to TanStack Start handler
    try {
      const response = await entry.fetch(request)
      console.log(`[${new Date().toISOString()}] 🌐 SSR ${pathname} -> ${response.status} (${Date.now() - start}ms)`)
      return response
    } catch (error) {
      console.error(`[${new Date().toISOString()}] ❌ ERROR ${pathname}:`, error)
      return new Response('Internal Server Error', { status: 500 })
    }
  }
})
