import express from 'express';

const routes = express.Router();


routes.get("/",(_,res)=>{
    res.send({ok:true})
})


export default routes;