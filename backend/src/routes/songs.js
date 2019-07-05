const router = require('express-promise-router')();
const songsController = require('../controllers/songs');
const auth = require('../middleware/auth');

router.get('/', [auth], songsController.get);

router.get('/:id', songsController.getOne);

router.post('/', [auth] , songsController.create);

router.put('/:id', songsController.update);

router.delete('/:id', [auth], songsController.delete);

module.exports = router;
