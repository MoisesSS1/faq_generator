const jwt = require('jsonwebtoken')


const checkUserForToken = async (token)=>{

    const user_id = await jwt.decode(token)
    return user_id

}

module.exports = checkUserForToken