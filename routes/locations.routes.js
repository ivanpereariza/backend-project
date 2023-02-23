const express = require('express')
const { takeIdsArray } = require('../utils/takeIdsUrl')
const router = express.Router()
const User = require('../models/User.model')
const ApiService = require('./../services/api.service')
const locationsApi = new ApiService
const { getViewData } = require('./../utils/getViewData')


router.post('/:id/add-favorites', (req, res, next) => {

    const { id } = req.params
    const { _id: user_id } = req.session.currentUser

    User
        .findByIdAndUpdate(user_id, { $addToSet: { 'favorites.locations': id } })
        .then(() => res.redirect(`/locations/details/${id}`))
        .catch(err => next(err))
})

router.post('/:id/quit-favorites', (req, res, next) => {

    const { id } = req.params
    const { _id: user_id } = req.session.currentUser

    User
        .findByIdAndUpdate(user_id, { $pull: { 'favorites.locations': id } })
        .then(() => res.redirect(`/locations/details/${id}`))
        .catch(err => next(err))
})


router.get('/results/:page', (req, res, next) => {

    let { name, type, dimension } = req.query
    const { page } = req.params

    name = name || ''
    type = type || ''
    dimension = dimension || ''

    locationsApi
        .getLocationsFilter(page, name, type, dimension)
        .then(({ data }) => {
            res.render('wiki/locations/results-locations', {
                locations: getViewData(data, page),
                name, type, dimension
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/locations/1?errorMessage=Dont find anything')
        })
})

router.get('/:page', (req, res, next) => {

    const { page } = req.params
    const { errorMessage } = req.query

    locationsApi
        .getAllLocations(page)
        .then(({ data }) => res.render('wiki/locations/list-locations', {
            locations: getViewData(data, page),
            errorMessage
        }))
        .catch(err => next(err))
})

router.get('/details/:id', (req, res, next) => {

    const { id } = req.params

    locationsApi
        .getLocationById(id)
        .then(({ data }) => {
            data.residents = takeIdsArray(data.residents, "character")
            locationsApi
                .getCharacterById(data.residents)
                .then(character => {
                    let char = character.data.length ? character.data : [character.data]
                    res.render('wiki/locations/details-locations', { location: data, char })
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
})

module.exports = router