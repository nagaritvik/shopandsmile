import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authroutes from "./routes/authroute.js"
import categoryroutes from "./routes/categoryroute.js"
import productroutes from "./routes/productroute.js"
import cors from "cors"
import bodyparser from "body-parser"
// Your Express app setup and route handlers here...

dotenv.config();
//database config 

connectDB();
const app = express();

//middlewares 
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authroutes);
app.use("/api/v1/category", categoryroutes)
app.use("/api/v1/product", productroutes)
app.use(bodyparser.json({ limit: '10mb' }));
app.use(bodyparser.urlencoded({ parameterLimit: 100000, limit: '10mb', extended: true }));
app.get('/', (req, res) => {
    res.send("<h1>Welcome to my MERN STACK app</h1>");
});

const port = process.env.port || 8000


app.listen(port, () => {
    console.log(`Server is running ${port}`);
});
