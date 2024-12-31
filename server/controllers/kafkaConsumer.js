import { consumer, connectConsumer } from "../services/kafka.js";
import GpsModelLogs from "../models/UserGPSLogs.js";

const consumeGPSLogs = async () => {
    await connectConsumer();

    await consumer.subscribe({ topic: 'user-gps-logs', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const gpsLog = JSON.parse(message.value.toString());
            console.log('Consumed GPS log:', gpsLog);

            // Save GPS log to database
            await GpsModelLogs.findOneAndUpdate(
                { userId: gpsLog.userId },
                { $push: { location: { lat: gpsLog.latitude, lng: gpsLog.longitude } }, updatedAt: new Date() },
                { upsert: true, new: true }
            );

            console.log(`Processed GPS log for user ${gpsLog.userId}`);
        }
    });
};

export default consumeGPSLogs;
