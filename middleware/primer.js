const jwt = require('jsonwebtoken')
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
function generateReFRESHToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}