// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    sourcemap: true,

    app: {
        head: {
            "meta": [
                {
                    "name": "viewport",
                    "content": "width=device-width, initial-scale=1",
                },
                {
                    "charset": "utf-8",
                },
            ],
            "link": [],
            "style": [],
            "script": [],
            "noscript": [],
        },
        // pageTransition: { name: 'page', mode: 'out-in' }
    },

    // allow connection from device on same wifi
    devServer: {
        host: "0.0.0.0",
    },

    runtimeConfig: {
        formSpreeUrl: process.env.VITE_FORM_SPREE_URL,
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler",
                },
            },
        },
    },
});
