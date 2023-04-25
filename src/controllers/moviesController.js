const { getAllMovies, getOneMovie, createMovie, updateMovie, destroyMovie } = require('../services/moviesServices');
const {validationResult} = require('express-validator');
const createResponseError = require('../helpers/createResponseError');




const moviesController = {
    'list': async (req, res) => {

        try{
          const movies = await getAllMovies()
          return res.status(200).json({
            ok: true,            
            data : movies,
            meta : {
                status: 200,
                total : movies.length,
                url : '/api/movies'
            },
        })
        } catch {
            return createResponseError(res, error)
        }    
          
    },
    'detail': async(req, res) => {

        try{
           
            const {
                params : {id}
            } = req;

            const movie = await getOneMovie(id)
            return res.status(200).json({
                ok: true,            
                    data : movie,
                    meta : {
                        status: 200,
                        total : 1,
                        url : `/api/movies/${id}`
                    },
             })
                
        }catch{
            return createResponseError(res, error)
        }
    },
    
   
    store: async (req,res) => {

        try {
            const errors = validationResult(req);

       if(!errors.isEmpty()) throw{
        status:400,
        message:errors.mapped()
    }

    const newMovie = await createMovie(req.body)
    return res.status(200).json({
        ok: true,            
            data : newMovie,
            meta : {
                status: 200,
                total : 1,
                url : `/api/genres/${newMovie.id}`
            },
     })
        } catch (error) {
            return createResponseError(res, error)
        }


       

    },
    
    update: async (req,res) => {

       try {
       const errors = validationResult(req);

       if(!errors.isEmpty()) throw{
        status:400,
        message:errors.mapped()
    }

    const movie = await updateMovie(req.params.id, req.body)
    if (!movie) {
        throw {
            status: 404,
            message: "Movie not found"
        }
    }
    return res.status(200).json({
        ok: true,            
            data : movie,
            meta : {
                status: 200,
                total : 1,
                url : `/api/movies/${movie.id}`
            },
     })            
       } catch (error) {
        return createResponseError(res, error) 
       }
    },
   
    destroy: async (req,res) => {
        try {
            const movieDeleted = await destroyMovie(req.params.id)
            return res.status(200).json({
                ok: true,            
                    data : movieDeleted,
                    meta : {
                        status: 200,
                        total : 1,
                        url : `/api/movies/${req.params.id}`
                    },
             })        
        } catch (error) {
            return createResponseError(res, error) 
        }
    }
}

module.exports = moviesController;