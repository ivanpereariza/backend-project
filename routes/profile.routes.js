const express = require('express')
const router = express.Router()
const User = require('./../models/User.model')
const fileUploader = require('../config/cloudinary.config')
const { isLoggedIn, checkRole, isOwnerOrAdmin } = require('./../middlewares/route-guards')
const Apiservice = require('./../services/api.service')
const infoApi = new Apiservice
const { checkisADMIN, checkisUserNoADMIN } = require('./../utils/checkRoleAnduser')


router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => {

            const { favorites: { characters, locations, episodies } } = user

            const promises = [
                infoApi.getCharacterById(characters),
                infoApi.getLocationById(locations),
                infoApi.getEpisodeById(episodies)
            ]

            Promise
                .all(promises)
                .then(([favCharacters, favLocations, favEpisodies]) => {

                    favCharacters = favCharacters.data.length ? favCharacters.data : [favCharacters.data]
                    favLocations = favLocations.data.length ? favLocations.data : [favLocations.data]
                    favEpisodies = favEpisodies.data.length ? favEpisodies.data : [favEpisodies.data]

                    const isADMIN = checkisADMIN(req.session.currentUser)
                    const isUserNoADMIN = checkisUserNoADMIN(req.session.currentUser, id)

                    res.render('user/profile', {
                        user,
                        favCharacters,
                        favLocations,
                        favEpisodies,
                        isADMIN, isUserNoADMIN
                    })
                })
                .catch(err => next(err))
        })
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
    let avatarUrl = req.file?.path

    User
        .findByIdAndUpdate(id, { username, email, description, dimension, avatarUrl })
        .then(() => res.redirect(`/profile/${id}`))
        .catch(err => next(err))
})

router.post('/:id/delete', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(res.redirect('/community'))
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