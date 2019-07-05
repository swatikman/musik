const router = require('express-promise-router')();
const admin = require("firebase-admin");
const playlistsController = require('../controllers/playlists');
const auth = require('../middleware/auth');

router.get('/', [auth], playlistsController.get);

router.get('/:id', playlistsController.getOne);

router.post('/', [auth] , playlistsController.create);

router.put('/:id', playlistsController.update);

router.delete('/:id', playlistsController.delete);

module.exports = router;
