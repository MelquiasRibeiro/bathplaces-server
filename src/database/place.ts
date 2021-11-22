
import mongoose from 'mongoose';

import PointSchema from "../utils/pointSchema";

const {Schema} = mongoose;

const PlaceSchema = new  Schema({

    placeName:{
        type:String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required: true,
    },
    location:{
        type:PointSchema,
        index: '2dsphere'
    },
    images:{
        type:[String],
    },
    creatorUser:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],    
},
{
    timestamps:true
}
)

export default mongoose.model("PlaceSchema", PlaceSchema)