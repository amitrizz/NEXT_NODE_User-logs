import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from './config/connectdb.js';
import userRoutes from "./routes/userRoutes.js";
import GPSRoutes from "./routes/GPSRoutes.js";

import consumeGPSLogs from "./controllers/kafkaConsumer.js";
import { connectProducer } from "./services/kafka.js";


const app = express();
// cors policy 
app.use(cors());
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;


// JSON 
app.use(express.json());//sort data into json format

// Connect Database
connectDB(DATABASE_URL);


// Routes
app.use("/api/user", userRoutes)//for security purposes change the path to /api/users
app.use("/api/gps", GPSRoutes);  // for employee related task done here

app.post("/", (req, res) => {
    console.log(req.body);
    return res.send("runing")
}) 

// Start Kafka producer and consumer
const startKafka = async () => {
    try {
        await connectProducer();
        console.log("Kafka producer connected");

        consumeGPSLogs(); // Start consuming logs
        console.log("Kafka consumer running");
    } catch (error) {
        console.error("Error starting Kafka services:", error);
    }
};
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    startKafka();
});



