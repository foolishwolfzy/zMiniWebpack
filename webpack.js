const Complier = require('./lib/complier.js')
const options = require('./webpack.config.js')

new Complier(options).run();