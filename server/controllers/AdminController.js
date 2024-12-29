import GpsModel from "../models/UserCurrentGpsTable.js";
import GpsModelLogs from "../models/UserGPSLogs.js";

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

         const gps = await GpsModelLogs.findOne({ userId:userId }).populate({
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
         console.log(user, latitude, longitude);
         if (!latitude || !longitude) {
            res.status(400).send({ status: "failed", message: "All filed are required" });
         }

         // Store User Each Logs in GPSModelLogs
         const updatedUser = await GpsModelLogs.findOneAndUpdate(
            { userId: user._id }, // Find the document by userId
            {
               $push: { location: { lat: latitude, lng: longitude } }, // Append the new lat/lng to the location array
               updatedAt: new Date(), // Update the updatedAt field
            },
            { upsert: true, new: true } // Create the document if it doesn't exist, and return the updated document
         );

         //update or create user current logs
         const result = await GpsModel.findOneAndUpdate(
            { userId: user._id },
            { latitude, longitude, updatedAt: new Date() }, // Update these fields
            { upsert: true, new: true } // Create new document if not found
         )

         // console.log(result);

         if (result) {
            // const long=location['longitude'] 
            res.status(200).send({ status: "Update success", data: result });
         }

      } catch (error) {
         console.error(error);
         res.status(500).send({ status: "failed", message: "Unable to update Employee" });
      }
   };

}

export default GPSController;