import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const signUp = asyncHandler(async (req, res, next) => {
  const {
    body: { firstName, lastName, email, password }
  } = req;
  if (!firstName || !lastName || !email || !password)
    throw new ErrorResponse('Please provide all fields', 400);
  const found = await User.findOne({ email });
  if (found) throw new ErrorResponse('User already exists', 401);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

export const signIn = asyncHandler(async (req, res, next) => {
  const {
    body: { email, password }
  } = req;
  if (!email || !password) throw new ErrorResponse('Please provide all fields', 400);
  const found = await User.findOne({ email }).select('+password');
  if (!found) throw new ErrorResponse('User does not exist', 404);
  const match = await bcrypt.compare(password, found.password);
  if (!match) throw new ErrorResponse('Password is incorrect', 401);
  const token = jwt.sign({ id: found._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const { uid } = req;
  const user = await User.findById(uid);
  if (!user) throw new ErrorResponse('User does not exist', 404);
  res.json(user);
});
