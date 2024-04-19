import mongoose from 'mongoose';
const { Schema, model, ObjectId } = mongoose;

const thoughtSchema = new Schema({
  author: { type: ObjectId, ref: 'User', required: [true, 'Author is required'] },
  image: { type: String, required: [true, 'Image is required'] },
  body: { type: String, required: [true, 'Body is required'] },
  date: { type: Date, default: Date.now }
});

export default model('Thought', thoughtSchema);
