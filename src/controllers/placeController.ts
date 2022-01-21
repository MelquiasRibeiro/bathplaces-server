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
}


export default new PlaceController();