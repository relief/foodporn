const entries = require('./entries')
const entrie = require('./entrie')
const restaurant = require('./restaurant')

module.exports = (app) => {
  app.use('/api/entrie', entrie)
  app.use('/api/entries', entries)
  app.use('/api/restaurant', restaurant)
}