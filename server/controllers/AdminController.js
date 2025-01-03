import GpsModel from "../models/UserCurrentGpsTable.js";
import GpsModelLogs from "../models/UserGPSLogs.js";
import { producer,connectProducer } from "../services/kafka.js";

class GPSController {

   static getAllGPS = async (req, res) => {
      try {
         const isAdmin = req.user.isAdmin;
         if (!isAdmin) {
            res.status(401).send({ status: "failed", message: "Unauthorized User for This Page" });
         }
         const gps = await GpsModel.find({}).populate({
            path: 'userId',
            select: '-password', // Exclude the password field
         });
         res.status(200).send({ status: "success", data: gps });
      } catch (error) {
         console.log(error);
         res.status(500).send({ status: "failed", message: "unable to get All Employee" });
      }
   };
   static eachUserLogs = async (req, res) => {
      try {
         const isAdmin = req.user.isAdmin; // Assuming `req.user` is set by middleware
         const userId = req.params.userid; // Extract specific parameter value
         // console.log(req.user, userId);

         if (!isAdmin) {
            return res.status(401).send({ status: "failed", message: "Unauthorized User Only Admin Can Access This Page" });
         }

         const gps = await GpsModelLogs.findOne({ userId: userId }).populate({
            path: 'userId',
            select: '-password -isAdmin', // Exclude both 'password' and 'isAdmin' fields
         });
         //  console.log(gps);


         if (!gps || gps.length === 0) {
            return res.status(404).send({ status: "failed", message: "No logs found for this user" });
         }

         res.status(200).send({ status: "success", data: gps });
      } catch (error) {
         console.log(error);
         res.status(500).send({ status: "failed", message: "unable to get All Employee" });
      }
   };

   static saveGPS = async (req, res) => {
      try {
         const { latitude, longitude } = req.body;
         const user = req.user;

         if (!latitude || !longitude) {
            return res.status(400).send({ status: "failed", message: "All fields are required" });
         }

         // Kafka message to produce
         const message = {
            userId: user._id,
            latitude,
            longitude,
            timestamp: new Date()
         };

         // Send GPS data to Kafka topic
         await producer.send({
            topic: 'user-gps-logs',
            messages: [{ value: JSON.stringify(message) }]
         });

         console.log('Produced GPS log to Kafka:', message);

         // Respond to the client
         res.status(200).send({ status: "success", message: "GPS log sent to Kafka" });
      } catch (error) {
         console.error(error);
         res.status(500).send({ status: "failed", message: "Unable to process GPS log" });
      }
   };

}

export default GPSController;