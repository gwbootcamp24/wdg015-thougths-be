import Thought from '../models/Thought.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllThoughts = asyncHandler(async (req, res, next) => {
  const thoughts = await Thought.find().sort({ date: -1 }).populate('author');
  res.json(thoughts);
});

export const createThought = asyncHandler(async (req, res, next) => {
  const { body, uid } = req;
  const newThought = await (await Thought.create({ ...body, author: uid })).populate('author');
  res.status(201).json(newThought);
});

export const getSingleThought = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  const thought = await Thought.findById(id).populate('author');
  if (!thought) throw new ErrorResponse(`Thought with id of ${id} doesn't exist`, 404);
  res.send(thought);
});

export const updateThought = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id },
    uid
  } = req;
  const found = await Thought.findById(id);
  if (!found) throw new ErrorResponse(`Thought with id of ${id} doesn't exist`, 404);
  if (uid !== found.author.toString())
    throw new ErrorResponse(`Not authorized to update this thought`, 403);
  const updatedThought = await (
    await Thought.findOneAndUpdate({ _id: id }, body, { new: true })
  ).populate('author');
  res.json(updatedThought);
});

export const deleteThought = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    uid
  } = req;
  const found = await Thought.findById(id);
  if (!found) throw new ErrorResponse(`Thought with id of ${id} doesn't exist`, 404);
  if (uid !== found.author.toString())
    throw new ErrorResponse(`Not authorized to delete this thought`, 403);
  await Thought.deleteOne({ _id: id });
  res.json({ success: `Thought with id of ${id} was deleted` });
});
