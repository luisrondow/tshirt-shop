// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
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
