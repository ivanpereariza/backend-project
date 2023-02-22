const express = require('express')
const { takeIdsArray } = require('../utils/takeIdsUrl')
const router = express.Router()
const User = require('../models/User.model')

const ApiService = require('./../services/api.service')
const { nextPage, prevPage } = require('./../utils/pages')

const locationsApi = new ApiService

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

    const promises = []

    for (let i = 1; i <= 7; i++) {
        promises.push(locationsApi.getAllLocations(i))
    }

    Promise
        .all(promises)
        .then(results => {
            console.log(results)
        })


    // locationsApi
    //     .getLocationsFilter(page, name, type, dimension)
    //     .then(({ data }) => res.render('wiki/episodies/results-episodies', {
    //         episodies: data.results,
    //         nextPage: nextPage(data, page),
    //         previousPage: prevPage(data, page),
    //         season
    //     }))
    //     .catch(err => next(err))
})

router.get('/:page', (req, res, next) => {

    const { page } = req.params

    locationsApi
        .getAllLocations(page)
        .then(({ data }) => res.render('wiki/locations/list-locations', {
            locations: data.results,
            nextPage: nextPage(data, page),
            previousPage: prevPage(data, page),
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

                    console.log(data.residents)

                    res.render('wiki/locations/details-locations', { location: data, char })
                })
        }).catch(err => next(err))
})

module.exports = router