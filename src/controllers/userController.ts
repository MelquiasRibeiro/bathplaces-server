import { Request, Response } from 'express';
import bcrypt from "bcrypt";

import User from "../database/user";

class UserController{
    async index(_:Request, res:Response){
        try{
        const users = await User.find();

        const allUsers = users.map(user=>{
            const {password,...others}= user._doc;
            return others
        })
        res.status(200).json(allUsers);
        } catch (error) {
          res.status(400).json({error:"something wrong with your request"})
        }
    }
    async update(req:Request, res:Response){
      try{
          const {body, params} = req;
          const user = await User.findByIdAndUpdate(params.id,{
          $set:body
        },{new:true});
        res.status(200).json(user);
        } catch (error) {
          res.status(400).json({error:"something wrong with your request"})
        }
    }

    async store(req:Request, res:Response){
        try {
          const {userName,email,password,profilePic}=req.body
          
          const salt = await bcrypt.genSalt(10);
          const hashedPass = await bcrypt.hash(password, salt);
          
          const newUser = new User({
            userName,
            email,
            password: hashedPass,
            profilePic: profilePic||""
          })

          const user = await newUser.save();

          res.status(201).json(user);

        } catch (error) {
          res.status(400).json({error:`something wrong with your request ${error}`})
        }
    }
    async delete(req:Request, res:Response){
      try{
        const {id} = req.params;
        try {
          await User.findByIdAndDelete(id);
          res.status(200).json("User has been deleted...");
        } catch (error) {
          res.status(500).json(error);
        }
      res.status(204);
      } catch (error) {
        res.status(404).json(
          {
          erro:"user not found",
          error
      })
      }
    }
    async show(req:Request,res:Response){
      try {
        const{id}=req.params
        const user = await User.findById(id)
        const { password, ...others } = user._doc;

        res.status(200).json(others);

      } catch (error) {
        res.status(500).json(error)
      }
    }

}


export default new UserController();