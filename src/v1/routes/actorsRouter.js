const router = require('express').Router();
const genresController = require('../../controllers/actorsController');
const actorsValidator = require('../../validations/actorsValidator');


/* /api/v1/actors */

router.get('/', genresController.list);
router.get('/:id', genresController.detail);
router.post('/',actorsValidator, genresController.store);
router.put('/:id',actorsValidator, genresController.update);
router.delete('/:id', genresController.destroy)


module.exports = router;