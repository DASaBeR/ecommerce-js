import expres from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";


// App Config
const app = expres();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(expres.json());
app.use(cors());

// API Endpoints
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send("At Home, API is working")
})

app.listen(port, () => {
    console.log('Server started on PORT : ', port)
})
