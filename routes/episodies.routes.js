const express = require('express')
const router = express.Router()
const { takeIdsArray } = require('../utils/takeIdsUrl')
const User = require('../models/User.model')
const ApiService = require('./../services/api.service')
const episodiesApi = new ApiService
const { getViewData } = require('./../utils/getViewData')

router.post('/:id/add-favorites', (req, res, next) => {

    const { id } = req.params
    const { _id: user_id } = req.session.currentUser

    User
        .findByIdAndUpdate(user_id, { $addToSet: { 'favorites.episodies': id } })
        .then(() => res.redirect(`/episodies/details/${id}`))
        .catch(err => next(err))
})

router.post('/:id/quit-favorites', (req, res, next) => {

    const { id } = req.params
    const { _id: user_id } = req.session.currentUser

    User
        .findByIdAndUpdate(user_id, { $pull: { 'favorites.episodies': id } })
        .then(() => res.redirect(`/episodies/details/${id}`))
        .catch(err => next(err))
})

router.get('/results/:page', (req, res, next) => {

    let { season } = req.query
    const { page } = req.params

    season = season || ''

    episodiesApi
        .getEpisodiesFilter(page, season)
        .then(({ data }) => res.render('wiki/episodies/results-episodies', {
            episodies: getViewData(data, page),
            season
        }))
        .catch(err => {
            console.log(err)
            res.redirect('/episodies/1?errorMessage=Dont find anything')
        })
})

router.get('/:page', (req, res, next) => {

    const { page } = req.params
    const { errorMessage } = req.query

    episodiesApi
        .getAllEpisodies(page)
        .then(({ data }) => res.render('wiki/episodies/list-episodies', {
            episodies: getViewData(data, page),
            errorMessage
        }))
        .catch(err => next(err))
})

router.get('/details/:id', (req, res, next) => {

    const { id } = req.params

    episodiesApi
        .getEpisodeById(id)
        .then(({ data }) => {
            data.characters = takeIdsArray(data.characters, "character")
            episodiesApi
                .getCharacterById(data.characters)
                .then(character => {
                    let char = character.data.length ? character.data : [character.data]
                    res.render('wiki/episodies/details-episodies', { episode: data, char })
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
})

module.exports = router