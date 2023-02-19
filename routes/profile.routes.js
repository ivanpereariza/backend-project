const express = require('express')
const router = express.Router()
const User = require('./../models/User.model')
const fileUploader = require('../config/cloudinary.config')
const { isLoggedIn, checkRole, isOwnerOrAdmin } = require('./../middlewares/route-guards')



router.get('/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            const isADMIN = req.session.currentUser?.role === "ADMIN"
            const isUserNoADMIN = () => {
                if (req.session.currentUser._id === id && req.session.currentUser.role !== "ADMIN") return true
            }
            res.render('user/profile', {
                user,
                isADMIN,
                isUserNoADMIN
            })
        })
        .catch(err => next(err))
})

router.get('/:id/edit', isLoggedIn, isOwnerOrAdmin, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => res.render('user/edit-profile', user))
        .catch(err => next(err))
})

router.post('/:id/edit', isLoggedIn, isOwnerOrAdmin, fileUploader.single('avatarUrl'), (req, res, next) => {
    const { username, email, description, dimension, id } = req.body
    req.file ? avatarUrl = req.file.path : avatarUrl = undefined
    User
        .findByIdAndUpdate(id, { username, email, description, dimension, avatarUrl })
        .then(() => res.redirect(`/profile/${id}`))
        .catch(err => next(err))
})

router.post('/:id/delete', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(res.redirect('/'))
        .catch(err => next(err))

})

router.post('/:id/:role', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { id, role } = req.params
    User
        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect(`/profile/${id}`))
        .catch(err => next(err))
})


module.exports = router