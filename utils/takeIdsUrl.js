function takeIdsArray(data, array) {
    return data.map(elm => elm.split(`https://rickandmortyapi.com/api/${array}/`)).flat(2).filter(elm => elm.length >= 1)
}

function takeIdOneItem(data, array) {
    return data.split(`https://rickandmortyapi.com/api/${array}/`).flat(2).filter(elm => elm.length >= 1)
}

module.exports = { takeIdsArray, takeIdOneItem }