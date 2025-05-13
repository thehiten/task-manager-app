import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
