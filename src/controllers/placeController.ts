import { Request, Response } from 'express';
import Place from '../database/place';

class PlaceController{
    async store(req:Request, res:Response){
        try {
          const {placeName,description,latitude,longitude,images,creatorUser}=req.body
        
          const location = {
            type:'Point',
            coordinates:[longitude, latitude]
        };

          const newPlace = new Place({
            placeName,
            description,
            images,
            location,
            creatorUser,
          })

          const place = await newPlace.save();

          res.status(201).json(place);

        } catch (error) {
          res.status(400).json({error:`something wrong with your request ${error}`})
        }
    }
    async index(req:Request, res:Response){
      
      try{
      const{latitude, longitude}= req.query;
      
       if(latitude && longitude){

         const nearPlaces = await Place.find({
           location: {
               $near:{
               $geometry:{
                       type: 'Point',
                       coordinates:[longitude,latitude],
               },
               $maxDistance: 10000,
           },
       },
       });
       
      res.status(200).json(nearPlaces);
      }else{
        const places = await Place.find();
        res.status(200).json(places);
      }
      } catch (error) {
        res.status(400).json({error:"something wrong with your request"})
      }
  }
}


export default new PlaceController();