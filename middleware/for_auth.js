var sha256 = require('js-sha256')
const jwt = require('jsonwebtoken')
require('dotenv').config()
//coding password by sha2 and salt
function  change_password(user_password){
    var pass=process.env.salt;
    pass+=user_password
    return sha256(pass);
}
function generateUserTokenData(result){
    return userTokenData = {
        id: result._id,
        name: result.name,
        email: result.email,
      };
}

function generateAccessToken(user) {
    let UserTokenData =  generateUserTokenData(user)
    // console.log(UserTokenData)
    return jwt.sign({user:UserTokenData}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}
function verify_access_token(token){
    if (token == null)  return 401
    jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return 403
        console.log("in function")
        console.log(user)
        return user
      })
    
}
// function verify_refresh_token(token){
//     if (token == null)  return 401
//     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return 403
//         return user
//       })
//     return user
    
// }
// function verify_user(access_token, refresh_token, user){
//     if (verify_access_token(access_token) != 401 && verify_access_token(access_token) != 403){
//         if (verify_refresh_token(refresh_token) != 401 && verify_refresh_token(refresh_token) != 403){
//             return user
    
//         }
//         return false
//     }
    
   
//     return false
    
// }
module.exports ={ generateAccessToken, verify_access_token, change_password}

