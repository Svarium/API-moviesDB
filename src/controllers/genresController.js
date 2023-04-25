
const createResponseError = require('../helpers/createResponseError');
const { getAllGenres, getOneGenre, createGenre, updateGenre, destroyGenre } = require('../services/genresServices');
const {validationResult} = require('express-validator')



const genresController = {
    'list': async (req, res) => {

        try{

         const genres = await getAllGenres()

            return res.status(200).json({
                ok: true,            
                data : genres,
                meta : {
                    status: 200,
                    total : genres.length,
                    url : '/api/genres'
                },
            })

        } catch (error){
            
            return createResponseError(res, error)
        }

       
       
    },
    'detail': async (req, res) => {

        try{

        const {
            params : {id}
        } = req;
       
        const genre = await getOneGenre(id)

         return res.status(200).json({
            ok: true,            
                data : genre,
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/genres/${id}`
                },
         })
        } catch(error){
            return createResponseError(res, error)
        }
    },

    store : async (req,res) => {

        try {

            const errors = validationResult(req);

            if(!errors.isEmpty()) throw{
                status:400,
                message:errors.mapped()
            }

          const newGenre = await createGenre(req.body)
          return res.status(200).json({
            ok: true,            
                data : newGenre,
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/genres/${newGenre.id}`
                },
         })
        } catch (error) {
            return createResponseError(res, error)
        }

     

    },

    update : async (req,res) => {

        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) throw{
                status:400,
                message:errors.mapped()
            }

           
            const genre = await updateGenre(req.params.id, req.body)
            
            if (!genre) {
                throw {
                    status: 404,
                    message: "Genre not found"
                }
            }
            return res.status(200).json({
                ok: true,            
                    data : genr,
                    meta : {
                        status: 200,
                        total : 1,
                        url : `/api/genres/${genre.id}`
                    },
             })            
        } catch (error) {
            return createResponseError(res, error) 
        }


    },
    destroy : async (req,res) => {
        try {
           const genreDeleted = await destroyGenre(req.params.id)
           return res.status(200).json({
            ok: true,            
                data : genreDeleted,
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/genres/${req.params.id}`
                },
         })        
        } catch (error) {
            return createResponseError(res, error) 
        }
    }

}

module.exports = genresController;



 /* destroy: (req,res) => {
        let movieId = req.params.id;
        Movies
        .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    } */