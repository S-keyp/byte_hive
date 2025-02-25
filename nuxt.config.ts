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
    // devServer: {
    //     host: "0.0.0.0",
    // },

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
