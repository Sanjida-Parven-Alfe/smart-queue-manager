import mongoose from 'mongoose';

const ActivityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);