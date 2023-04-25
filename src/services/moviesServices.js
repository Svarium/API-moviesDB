const db = require('../database/models');



module.exports = {

    getAllMovies : async () => {

        try {
            const movies = await db.Movie.findAll();

            return movies
        }
        catch (error){
            throw {
                status: 500,
                message : error.message
            }
        }
       
    },

    getOneMovie : async (id) => {
        try{
            const movie = await db.Movie.findByPk(id)

            return movie
        }
        catch (error) {
            throw {
                status: 500,
                message : error.message
            }
        }
    },

    createMovie : async (data) =>{
        try {
            const newMovie = db.Movie.create({
                ...data
            })
            return newMovie
        } catch (error) {
            throw {
                status: 500,
                message : error.message
            }
        }
    },
    
    updateMovie : async (id,data) => {
        try {
            const movie = await db.Movie.update({
                ...data
            },
           { 
            where : {id:id}
            });

            return movie

        } catch (error) {
            throw {
                status: 500,
                message : error.message
            }
        }
    },

    destroyMovie : async (id) => {
        try {
         const movieDestroy = await db.Movie.destroy({
                where : {id:id},
                force: true
            })

            return movieDestroy
        } catch (error) {
            throw {
                status: 500,
                message : error.message
            }
        }
    }
}