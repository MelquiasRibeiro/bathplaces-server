import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import dotenv from "dotenv"



dotenv.config()

const port = process.env.PORT||"3333"



const app = express();
app.use(cors());
app.use(express.json());

app.use(routes); 

app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


app.listen(port,()=>{
    console.log(`The aplication is runnig at http://localhost:${port}/`)
});