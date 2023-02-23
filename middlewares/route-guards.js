const Event = require('./../models/Event.model')

const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) next()
    else res.render('auth/login', { errorMessage: 'Login to continue' })
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) next()
    else res.redirect(`/profile/${req.session.currentUser._id}`)
}

const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) next()
    else res.render('auth/login', { errorMessage: 'You dont have permissions' })
}

const isOwnerOrAdmin = (req, res, next) => {
    if (req.session.currentUser._id === req.params.id || req.session.currentUser.role === "ADMIN") next()
    else res.render('auth/login', { errorMessage: 'You dont have permissions' })
}

const isOwnerOrAdminOrEditor = (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .then(event => {
            if (req.session.currentUser._id === event.organizer.toString()
                || req.session.currentUser.role === "ADMIN"
                || req.session.currentUser.role === "EDIT") next()
            else res.render('auth/login', { errorMessage: 'You dont have permissions' })
        })
        .catch(err => console.log(err))
}


module.exports = { isLoggedIn, isLoggedOut, checkRole, isOwnerOrAdmin, isOwnerOrAdminOrEditor }