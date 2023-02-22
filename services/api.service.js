const axios = require('axios')


class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://rickandmortyapi.com/api'
        })
    }

    getAllCharacters(page) {
        return this.api.get(`/character?page=${page}`)
    }

    getCharacterById(id) {
        return this.api.get(`/character/${id}`)
    }

    getCharactersFilter(page, name, species, status, gender) {
        return this.api.get(`character?page=${page}&name=${name}&status=${status}&species=${species}&gender=${gender}`)
    }

    getAllLocations(page) {
        return this.api.get(`/location?page=${page}`)
    }

    getLocationById(id) {
        return this.api.get(`/location/${id}`)
    }

    getLocationsFilter(page, name, type, dimension) {
        return this.api.get(`location?page=${page}&name=${name}&type=${type}&dimension=${dimension}`)
    }

    getAllEpisodies(page) {
        return this.api.get(`/episode?page=${page}`)
    }

    getEpisodeById(id) {
        return this.api.get(`/episode/${id}`)
    }

    getEpisodiesFilter(page, season) {
        return this.api.get(`episode?page=${page}&episode=${season}`)
    }
}

module.exports = ApiService