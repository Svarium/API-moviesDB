const router = require('express').Router();
const genresController = require('../../controllers/genresController');
const genresValidator = require('../../validations/genresValidator');


/* /api/v1/genres */

router.get('/', genresController.list);
router.get('/:id', genresController.detail);
router.post('/',genresValidator, genresController.store);
router.put('/:id', genresController.update);
router.delete('/:id', genresController.destroy)


module.exports = router;