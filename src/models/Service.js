import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, enum: [15, 30, 60], required: true },
  requiredStaffType: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);