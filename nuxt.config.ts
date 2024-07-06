// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    '@crazydos/nuxt-msw',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Poppins: true,
          Lora: true,
        },
      },
    ],
  ],
})
