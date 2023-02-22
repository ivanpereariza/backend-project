module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)

    const profileRoutes = require("./profile.routes")
    app.use("/profile", profileRoutes)

    const charactersRoutes = require("./characters.routes")
    app.use("/characters", charactersRoutes)

    const locationsRoutes = require("./locations.routes")
    app.use("/locations", locationsRoutes)

    const episodiesRoutes = require("./episodies.routes")
    app.use("/episodies", episodiesRoutes)

    const eventsRoutes = require("./events.routes")
    app.use("/events", eventsRoutes)

    const apiRoutes = require("./api.routes")
    app.use("/api", apiRoutes)
}