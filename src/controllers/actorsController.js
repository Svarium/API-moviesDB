
const {validationResult} = require('express-validator');
const createResponseError = require('../helpers/createResponseError');
const { getAllActors, getOneActor, createActor, updateActor, destroyActor } = require('../services/actorsServices');


const genresController = {
    'list': async (req, res) => {

        try{
           const actors = await getAllActors()
           return res.status(200).json({
            ok: true,            
            data : actors,
            meta : {
                status: 200,
                total : actors.length,
                url : '/api/actors'
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

            const actor = await getOneActor(id)
            return res.status(200).json({
                ok: true,            
                    data : actor,
                    meta : {
                        status: 200,
                        total : 1,
                        url : `/api/actors/${id}`
                    },
             })
        
        } catch{
           
        }
    },

    store : async (req,res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) throw{
                status:400,
                message:errors.mapped()
            }
            const newActor = await createActor(req.body)
            return res.status(200).json({
                ok: true,            
                    data : newActor,
                    meta : {
                        status: 200,
                        total : 1,
                        url : `/api/actors/${newActor.id}`
                    },
             })

        } catch (error) {
            
        }
    },

    update : async (req,res) => {
         try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) throw{
        status:400,
        message:errors.mapped()
    }

    const actor = await updateActor(req.params.id, req.body)
    if (!actor) {
        throw {
            status: 404,
            message: "Actor not found"
        }
    }
    return res.status(200).json({
        ok: true,            
            data : actor,
            meta : {
                status: 200,
                total : 1,
                url : `/api/actors/${actor.id}`
            },
     })          


        } catch (error) {
            return createResponseError(res, error)
}
    },
    destroy : async (req,res) => {
        try {
            const actorDeleted = await destroyActor(req.params.id)
            return res.status(200).json({
                ok: true,            
                    data : actorDeleted,
                    meta : {
                        status: 200,
                        total : 1,
                        url : `/api/actors/${req.params.id}`
                    },
             })        
        } catch (error) {
            return createResponseError(res, error) 
        }
    }

}

module.exports = genresController;