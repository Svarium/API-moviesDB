const router = require('express').Router();
const genresController = require('../../controllers/moviesController');
const moviesValidator = require('../../validations/moviesValidator');


/* /api/v1/movies */

router.get('/', genresController.list);
router.get('/:id', genresController.detail);
router.post('/',moviesValidator, genresController.store);
router.put('/:id',moviesValidator, genresController.update);
router.delete('/:id', genresController.destroy)


module.exports = router;