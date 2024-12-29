import mongoose from 'mongoose';

// GPS Schema
const UserAllGPSSchema = new mongoose.Schema(
  {
    location: [
      {
        lat: {
          type: String,
          required: true,
        },
        lng: {
          type: String,
          required: true,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference the UserModel
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

const GpsModelLogs = mongoose.model("UserAllGPSLogs", UserAllGPSSchema);
export default GpsModelLogs;
