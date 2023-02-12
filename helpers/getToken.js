const jwt = require('jsonwebtoken')

async function getToken (user){
    const id  = await user._id.toString()

    const token = await jwt.sign(id,process.env.JWT_SECRET)
    return token
}

module.exports = getToken