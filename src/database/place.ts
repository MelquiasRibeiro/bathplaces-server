
import mongoose from 'mongoose';

const {Schema} = mongoose;

const PointSchema= new mongoose.Schema({
    type:{
        type: String,
        enum: ['Point'],
        required:true,
    },
    coordinates:{
        type:[Number],
        required:true,
    }

});

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

export default mongoose.model("Place", PlaceSchema)