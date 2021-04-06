/* eslint-disable @typescript-eslint/no-var-requires */
console.log('-----------------------------------------') // eslint-disable-line
console.log(process.env.ENVIRONMENT) // eslint-disable-line
console.log('-----------------------------------------') // eslint-disable-line
const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment]
module.exports = require('knex')(config)
