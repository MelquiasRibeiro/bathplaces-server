import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const port = process.env.PORT||"3333"
const databaseUrl = process.env.MONGO_URL

mongoose.connect(databaseUrl)
.then(()=>console.log("Conected to MongoDB"))
.catch(err=>console.log(err));

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes); 

app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


app.listen(port,()=>{
    console.log(`The aplication is runnig at http://localhost:${port}/`)
});