import express from 'express';
import UserController from "./controllers/userController";
import PlaceController from "./controllers/placeController";
import SessionController from './controllers/sessionController';
import auth from './middlewares/auth';

const routes = express.Router();


routes.get("/",(_,res)=>{
    res.send({ok:true})
})

routes.post("/session", SessionController.store);
routes.post("/users",UserController.store)

routes.use(auth);

 routes.get("/users",UserController.index)
 routes.post("/places",PlaceController.store)
 routes.get("/places",PlaceController.index)

// routes.get("/users/:id",UserController.show)
// routes.put("/users/:id",UserController.update)
// routes.delete("/users/:id",UserController.delete)

export default routes;