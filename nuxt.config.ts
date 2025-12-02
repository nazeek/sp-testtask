export default defineNuxtConfig({
  compatibilityDate: '2025-12-01',
  app: {
    head: {
      title: 'StarPets - Marketplace of In-Game Items',
    }
  },
  devtools: { enabled: true },
  
  srcDir: 'src/',
  
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  ssr: true,

  css: ['modern-normalize/modern-normalize.css', '~/app/styles/main.scss'],

  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
      }
    }
  }
})
