import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serviceType: { type: String, required: true },
  dailyCapacity: { type: Number, default: 5 },
  status: { type: String, enum: ['Available', 'On Leave'], default: 'Available' }
}, { timestamps: true });

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema);