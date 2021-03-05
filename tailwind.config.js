const production = !process.env.IS_DEV_ENVIRONMENT
module.exports = {
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    plugins: [],
    purge: {
        content: [
            "./src/*.svelte",
            "./src/**/*.svelte",
            "./public/*.html",
            "./public/**/*.html",
        ],
        enabled: production,
    },
}
