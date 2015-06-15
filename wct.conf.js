module.exports = {
  suites: ["test/wct"],
  verbose: true,
  plugins: {
    local: {
      browsers: ['chrome', 'firefox']
    }
  },
};