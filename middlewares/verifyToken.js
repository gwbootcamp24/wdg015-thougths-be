import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  const {
    headers: { authorization }
  } = req;
  if (!authorization) throw new ErrorResponse('Please login', 401);
  const payload = jwt.verify(authorization, process.env.JWT_SECRET);
  req.uid = payload.id;
  next();
});

export default verifyToken;
