const {check} = require('express-validator');

module.exports = 
   [
     check('first_name')
     .notEmpty()
     .withMessage('El campo name es obligatorio'),
     check('last_name')
     .notEmpty()
     .withMessage('El campo lastname es obligatorio'),
     check('rating')
     .notEmpty()
     .withMessage('El campo rating es obligatorio'),    
    ]
