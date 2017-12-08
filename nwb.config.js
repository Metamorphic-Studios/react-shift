module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'react-shift',
      externals: {
        react: 'React'
      }
    }
  }
}
