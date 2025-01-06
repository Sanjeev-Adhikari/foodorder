import express from 'express';
import "./database/dbconnection.js"
import { BACKEND_PORT } from './config/dotenv.js';
import "./models/index.js"
// Imports for routes

import userRoute from './routes/userRoutes.js'
import foodRoute from "./routes/foodRoutes.js"
import { adminSeeder } from './adminseeder.js';
import categoryController from './controllers/categoryController.js';


const app = express();

const PORT = BACKEND_PORT;
app.get("/", (req, res)=>{
    res.send("Server is live!");
});

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// admin seeder
adminSeeder();
categoryController.seedCategory();

app.use(express.static("./uploads"))
//endpoints here
app.use("/api/user", userRoute );
app.use("/api/food", foodRoute);

app.listen(PORT, ()=>{
    console.log("server has started on PORT no:" + PORT);
});