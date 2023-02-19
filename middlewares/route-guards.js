const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) next()
    else res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) next()
    else res.redirect(`/profile/${req.session.currentUser._id}`)
}

const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) next()
    else res.render('auth/login', { errorMessage: 'No dispones de permisos' })
}

const isOwnerOrAdmin = (req, res, next) => {
    if (req.session.currentUser._id === req.params.id || req.session.currentUser.role === "ADMIN") next()
    else res.render('auth/login', { errorMessage: 'No dispones de permisos' })
}


module.exports = { isLoggedIn, isLoggedOut, checkRole, isOwnerOrAdmin }