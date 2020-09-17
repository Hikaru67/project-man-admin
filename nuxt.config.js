import icons from './configs/icons'

require('dotenv').config()

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'universal',
  mode: 'spa',

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Style resources
  */
  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_mixins.scss'
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/less/theme.less', lang: 'less' },
    { src: '~/assets/scss/style.scss', lang: 'scss' }
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/api',
    '@/plugins/validator',
    '@/plugins/directive'
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    '@nuxtjs/fontawesome'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    'nuxt-i18n'
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_BASE_URL
  },

  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },

  /*
  ** Nuxt i18n
  ** See https://i18n.nuxtjs.org/
  */
  i18n: {
    locales: ['ja', 'en', 'vi'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        ja: require('./locales/ja.json'),
        en: require('./locales/en.json'),
        vi: require('./locales/vi.json')
      },
      silentTranslationWarn: true
    }
  },

  /*
  ** Nuxt Fontawesome
  ** See https://github.com/nuxt-community/fontawesome-module/
  */
  fontawesome: {
    icons
  },

  /*
   ** Active router link
   */
  router: {
    linkActiveClass: 'active-link'
  },

  /**
   * Nuxt Auth
   * See https://auth.nuxtjs.org/
   */
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
      user: '/profile'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'data.api_token' },
          user: { url: '/me', method: 'get', propertyName: 'data' },
          logout: { url: '/logout', method: 'post' }
        }
      }
    },
    plugins: [
      '~/plugins/api.js'
    ]
  }
}
