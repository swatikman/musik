const accountController = require('../controllers/account');
const router = require('express-promise-router')();

router.post('/sign-up', accountController.signUp);

router.get('/', accountController.get);

router.put('/', accountController.update);

module.exports = router;
