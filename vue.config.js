module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/Beer-API/' : '/',
    configureWebpack: {
        devtool: 'source-map'
    }
};
