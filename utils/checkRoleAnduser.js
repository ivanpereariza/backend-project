function checkIsEditOrOwnerOrAdmin(currentUser, eventOrganizer) {
    if (currentUser?.role === 'EDIT' ||
        currentUser._id === eventOrganizer.id ||
        currentUser?.role === 'ADMIN') {
        return true
    }
}

function checkisADMIN(currentUser) {
    if (currentUser?.role === "ADMIN") return true
}

function checkisUserNoADMIN(currentUser, id) {
    if (currentUser._id === id && currentUser.role !== "ADMIN") return true
}

module.exports = { checkIsEditOrOwnerOrAdmin, checkisADMIN, checkisUserNoADMIN }