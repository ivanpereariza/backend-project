require("dotenv").config()

require("./db")

const express = require("express")

const hbs = require("hbs")

const app = express()

require("./config")(app)
require('./config/session.config')(app)

const capitalize = require("./utils/capitalize")
const projectName = "backend-proyect"

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

const indexRoutes = require("./routes/index.routes")
app.use("/", indexRoutes)

const authRoutes = require("./routes/auth.routes")
app.use("/", authRoutes)

const profileRoutes = require("./routes/profile.routes")
app.use("/profile", profileRoutes)

const charactersRoutes = require("./routes/characters.routes")
app.use("/characters", charactersRoutes)

const locationsRoutes = require("./routes/locations.routes")
app.use("/locations", locationsRoutes)

const episodiesRoutes = require("./routes/episodies.routes")
app.use("/episodies", episodiesRoutes)

const eventsRoutes = require("./routes/events.routes")
app.use("/events", eventsRoutes)


require("./error-handling")(app)

module.exports = app
