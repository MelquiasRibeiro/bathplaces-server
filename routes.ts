import express from 'express';
import UserController from "./src/controllers/userController";
import SessionController from './src/controllers/SessionController';
import auth from './src/middlewares/auth';

const routes = express.Router();


routes.get("/",(_,res)=>{
    res.send({ok:true})
})

routes.post("/users",UserController.store)
routes.post('/session', SessionController.store);

routes.use(auth);

routes.get("/users",UserController.index)
routes.get("/users/:id",UserController.show)
routes.put("/users/:id",UserController.update)
routes.delete("/users/:id",UserController.delete)

export default routes;