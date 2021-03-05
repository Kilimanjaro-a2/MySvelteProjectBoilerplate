/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack")
const sveltePreprocess = require("svelte-preprocess")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
/* eslint-enable */

const mode = process.env.IS_DEV_ENVIRONMENT ? "development" : "production"
const plugins = [
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
    }),
    new CopyPlugin({
        patterns: [{ from: "public", to: "./" }],
    }),
]
if (mode == "development") {
    plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
    plugins,
    mode,
    entry: "./src/index.ts",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.(html|svelte)$/,
                use: [
                    { loader: "babel-loader" },
                    {
                        loader: "svelte-loader",
                        options: {
                            emitCss: true,
                            hotreload: true,
                            preprocess: sveltePreprocess({
                                sourceMap: false,
                                postcss: {
                                    plugins: [
                                        require("tailwindcss"),
                                        require("autoprefixer"),
                                        require("postcss-nesting"),
                                    ],
                                },
                            }),
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "src"),
        },
        extensions: [".mjs", ".ts", ".js", ".svelte"],
    },
    devServer: {
        open: true,
        openPage: "index.html",
        contentBase: path.join(__dirname, "public"),
        compress: true,
        watchContentBase: true,
        port: 9000,
    },
    // devtool: 'source-map',
}
