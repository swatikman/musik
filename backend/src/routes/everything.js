const router = require('express-promise-router')();
const everythingController = require('../controllers/everything');

router.get('/search', everythingController.search);

module.exports = router;
