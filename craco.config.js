module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.dcard.tw/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
