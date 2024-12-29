import mongoose from 'mongoose';

// GPS Schema
const UserGPSSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference the UserModel
        required: true,
    },
    updatedAt: { type: Date, default: Date.now },
},
    {
        timestamps: true,
    });

const GpsModel = mongoose.model("usercurrentlogs", UserGPSSchema);
export default GpsModel;
