const router = require('express-promise-router')();
const playlistsController = require('../controllers/playlists');
const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');

router.get('/', [optionalAuth], playlistsController.get);

router.get('/:id', [optionalAuth], playlistsController.getOne);

router.post('/', [auth] , playlistsController.create);

router.put('/:id', [auth], playlistsController.update);

router.delete('/:id', [auth], playlistsController.delete);

router.post('/:id/sharedLink', [auth], playlistsController.createSharedLink);

router.get('/:id/sharedLink', [auth], playlistsController.getSharedLink);

router.put('/:playlistId/songs/:songId', [auth], playlistsController.toggleSong);

module.exports = router;
