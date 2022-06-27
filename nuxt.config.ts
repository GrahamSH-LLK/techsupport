import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        // Using package name (recommended usage)
        '@nuxtjs/tailwindcss',
    ],
    vite: {
        server: {
          hmr: {
            protocol: 'wss'
          }
        }
      }
       

})
