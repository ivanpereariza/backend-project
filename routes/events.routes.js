const express = require('express')
const router = express.Router()
const Event = require('../models/Event.model')
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, isOwnerOrAdminOrEditor } = require('./../middlewares/route-guards')
const { checkIsEditOrOwnerOrAdmin } = require('./../utils/checkRoleAnduser')

router.get('/', isLoggedIn, (req, res, next) => {

    Event
        .find()
        .select({ title: 1, image: 1, dimension: 1, organizer: 1 })
        .sort({ title: 1 })
        .populate('organizer')
        .then(events => res.render('events/all-events', { events }))
        .catch(err => next(err))
})

router.get('/create', isLoggedIn, (req, res, next) => {

    res.render('events/new-event')
})

router.post('/create', isLoggedIn, fileUploader.single('image'), (req, res, next) => {

    const { title, description, dimension, date, longitude, latitude, id: organizer } = req.body
    let image = req.file?.path
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

router.get('/results', isLoggedIn, (req, res, next) => {

    const { dimension } = req.query

    Event
        .find({ dimension })
        .select({ title: 1, image: 1, dimension: 1, organizer: 1 })
        .then(events => res.render('events/all-events', { events }))
        .catch(err => next(err))
})

router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .populate('organizer participants')
        .then(events => {
            const isEditOrOwnerOrAdmin = checkIsEditOrOwnerOrAdmin(req.session.currentUser, events.organizer)
            res.render('events/event-details', { events, isEditOrOwnerOrAdmin })
        })
        .catch(err => next(err))
})

router.get('/:id/edit', isLoggedIn, isOwnerOrAdminOrEditor, (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .then(event => res.render('events/edit-event', event))
        .catch(err => next(err))
})

router.post('/:id/edit', isLoggedIn, isOwnerOrAdminOrEditor, fileUploader.single('image'), (req, res, next) => {

    const { title, description, dimension, date, longitude, latitude, id } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    let image = req.file?.path

    Event
        .findByIdAndUpdate(id, { title, description, dimension, date, image, location })
        .then(() => res.redirect(`/events/${id}`))
        .catch(err => next(err))

})

router.post('/:id/delete', isLoggedIn, isOwnerOrAdminOrEditor, (req, res, next) => {

    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.redirect('/events'))
        .catch(err => next(err))
})

router.post('/:id/add-event', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const { _id: user_id } = req.session.currentUser

    Event
        .findByIdAndUpdate(id, { $addToSet: { participants: user_id } })
        .then(() => res.redirect(`/events/${id}`))
        .catch(err => next(err))
})

router.post('/:id/leave-event', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const { _id: user_id } = req.session.currentUser

    Event
        .findByIdAndUpdate(id, { $pull: { participants: user_id } })
        .then(() => res.redirect(`/events/${id}`))
        .catch(err => next(err))
})

module.exports = router