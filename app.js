require("dotenv").config()

require("./db")

const express = require("express")
const app = express()

require("./config")(app)
require('./config/session.config')(app)

app.locals.appTitle = `Rick and Morty Website`

require('./routes')(app)
require("./error-handling")(app)

module.exports = app
