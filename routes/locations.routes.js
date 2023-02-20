const express = require('express')
const router = express.Router()

const ApiService = require('./../services/api.service')
const { nextPage, prevPage } = require('./../utils/pages')

const locationsApi = new ApiService

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
        .then(({ data }) => res.render('wiki/locations/details-locations', { location: data }))
        .catch(err => next(err))
})

module.exports = router