import express from 'express';
import "./database/dbconnection.js"
import { BACKEND_PORT } from './config/dotenv.js';

// Imports for routes

import userRoute from './routes/userRoutes.js'


const app = express();

const PORT = BACKEND_PORT;
app.get("/", (req, res)=>{
    console.log("Server is live!");
});

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

//endpoints here
app.use("/api/user", userRoute );

app.listen(PORT, ()=>{
    console.log("server has started on PORT no:" + PORT);
});