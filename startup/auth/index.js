const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async function (req, res, next) {
    let token = req.header('Authorization')
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized user credentials' })

    try {
        let decode = await jwt.verify(token, process.env.TOKEN_PRIVATE_KEY)
        req.user = decode
        // console.log(decode, 'Decodeing')
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid authorization token.' })
    }
}