const { check, validationResult, body } = require('express-validator')
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

const login_checker=[ 
    check('name', 'Name is no inputed')
    .notEmpty(),
    check('password', 'Password is no inputed')
    .notEmpty() ]


    module.exports = {message_check,register_check,login_checker};    
