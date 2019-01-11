const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path')
// const theme = require('./package.json').theme
module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
    config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
    };
    /* config.module.rules = [
        ...config.module.rules,
        {
            test: /\.less|css$/,
            use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                },
                {
                    laoder: "less-loader",
                    options: {
                        modifyVars: theme
                    }
                }
            ]
        }
    ] */
    return config;
};