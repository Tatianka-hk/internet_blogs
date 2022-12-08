//checking inputed data from user
const { check } = require('express-validator')


// checking data from " / #contact"
const message_check=[ 
    check('name', 'Name is no inputed')
    .notEmpty(),
    check('email', 'Email is not valid')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('phone', 'Phone is not valid')
    .isMobilePhone(),
    check('message', 'Message is no inputed')
    .notEmpty() 
]
// checking data from "auth/register"
const register_check=[ 
    check('name', 'Name is no inputed')
    .notEmpty(),
    check('email', 'Email is not valid')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('password', 'Password is not valid')
    .exists()
    .isLength({ min: 8 })
]

// checking data from "auth/login"
const login_checker=[ 
    check('name', 'Name is no inputed')
    .notEmpty(),
    check('password', 'Password is no inputed')
    .notEmpty()
]
// checking data from "user/user_id"
const blog_checker=[
    check('name', 'Name is no inputed')
    .notEmpty()
]
//check inputed user name from "user/user_id"
function changed_name_checker(edit_name_input){
    str = String(edit_name_input)
    erorrs = []
    if (str.length == 0){
        erorrs.push("Name is no inputed")
    } 
    return erorrs
}
//check inputed user email from "user/user_id"
function email_checker(edit_email_input) {
    str = String(edit_email_input)
    erorrs = []
    var validRegex = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
    if ( str.match(validRegex)) {
        erorrs.push("Invalid email address!");
    }
    return erorrs

  }


module.exports = {message_check,register_check,login_checker,blog_checker,changed_name_checker,email_checker};    
