const express = require('express')
const router = express.Router()

const User = require('../models/User.model')
const Event = require('../models/Event.model')
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRole } = require('./../middlewares/route-guards')


router.get('/', isLoggedIn, (req, res, next) => {
    Event
        .find()
        .populate('organizer')
        .then(events => res.render('events/all-events', { events }))
        .catch(err => next(err))
})

router.get('/create', isLoggedIn, (req, res, next) => {

    res.render('events/new-event')
})

router.post('/create', isLoggedIn, fileUploader.single('image'), (req, res, next) => {

    const { title, description, dimension, date, longitude, latitude, id: organizer } = req.body
    req.file ? image = req.file.path : image = undefined
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    if (description.length < 10) {
        res.render('events/new-event', { errorMessage: 'Required description. Minimum 10 characters' })
        return
    }

    Event
        .create({ title, description, dimension, date, image, location, organizer })
        .then(() => res.redirect('/events'))
        .catch(err => next(err))

})

router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    Event
        .findById(id)
        .populate('organizer')
        .then(events => {
            const isEditOrOwnerOrAdmin = req.session.currentUser?.role === 'EDIT' || req.session.currentUser._id === events.organizer.id || req.session.currentUser?.role === 'ADMIN'
            res.render('events/event-details', { events, isEditOrOwnerOrAdmin })
        })
        .catch(err => next(err))
})

router.get('/:id/edit', isLoggedIn, checkRole('EDIT', 'ADMIN'), (req, res, next) => {

    const { id } = req.params


    Event
        .findById(id)
        .then(event => res.render('events/edit-event', event))
        .catch(err => next(err))
})

router.post('/:id/edit', isLoggedIn, checkRole('EDIT', 'ADMIN'), fileUploader.single('image'), (req, res, next) => {
    const { title, description, dimension, date, longitude, latitude, id } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    req.file ? image = req.file.path : image = undefined
    Event
        .findByIdAndUpdate(id, { title, description, dimension, date, image, location })
        .then(() => res.redirect(`/events/${id}`))
        .catch(err => next(err))

})

router.post('/:id/delete', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.redirect('/events'))
        .catch(err => next(err))
})

router.post('/:id/add-event', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    // const { participants } = req.body
    const { user_id } = req.session.currentUser._id

    Event
        .findByIdAndUpdate(id, { $addToSet: { participants: user_id } })
        .then(() => res.redirect(`/events/${id}`))
        .catch(err => next(err))



})



module.exports = router