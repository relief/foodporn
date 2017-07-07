require('newrelic');
const express = require('express')
const mountRoutes = require('./routes')
var bodyParser = require('body-parser')

const app = express()
app.set("port", process.env.PORT || 3001);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mountRoutes(app)

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
