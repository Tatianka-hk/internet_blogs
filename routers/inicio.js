const express = require( 'express' );
const AuthController = require( '../controllers/Inicio' );
const router = express.Router();
const { message_check } = require( '../middleware/check' ); // for checking inputed data from user

router.get( '/', AuthController.inicio_get );
router.post( '/', message_check, AuthController.inicio_post );

module.exports = router;
