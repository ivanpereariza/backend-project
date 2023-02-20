const express = require('express')
const router = express.Router()

const User = require('../models/User.model')
const Event = require('../models/Event.model')
const { isLoggedIn } = require('./../middlewares/route-guards')


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

router.post('/create', isLoggedIn, (req, res, next) => {

    const { title, description, dimension, date, longitude, latitude, id: organizer } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    if (description.length < 10) {
        res.render('events/new-event', { errorMessage: 'Required description. Minimum 10 characters' })
        return
    }

    Event
        .create({ title, description, dimension, date, location, organizer })
        .then(() => res.redirect('/'))
        .catch(err => next(err))

})

router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    Event
        .findById(id)
        .populate('organizer')
        .then(events => res.render('events/event-details', events))
        .catch(err => next(err))
})

router.get('/:id/edit', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .then(event => res.render('events/edit-event', event))
        .catch(err => next(err))
})





module.exports = router