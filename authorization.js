const jwt = require('jsonwebtoken')

const validate = (req, res, next) => {
    const token = req.header('tokenium')
    if (!token) return res.status(400).send('Access rejected')

    try {
        const verified = jwt.verify(token, process.env.TOKENIUM)
        req.user = verified
        next()
    } catch(err) {
        res.status(400).send('Wrong Token')
    }
}

module.exports = validate