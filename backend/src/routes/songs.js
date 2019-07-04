const router = require('express-promise-router')();
const admin = require("firebase-admin");
const songsController = require('../controllers/songs');

router.get('/', songsController.get);

router.get('/:id', songsController.getOne);

router.post('/', songsController.create);

router.put('/', songsController.update);

router.delete('/', songsController.delete);

module.exports = router;
