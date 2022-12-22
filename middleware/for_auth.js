var sha256 = require('js-sha256')
const jwt = require('jsonwebtoken')
require('dotenv').config()
//coding password by sha2 and salt
function  change_password(user_password){
    var pass=process.env.salt;
    pass+=user_password
    return sha256(pass);
}
function generateUserTokenData( result ){
    return userTokenData = {
        id: result._id,
        name: result.name,
      };
}

module.exports ={ generateUserTokenData, change_password } 