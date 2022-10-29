import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide all values');
  }

  const user = await User.findOne({ email }).exec();

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30d' },
  );

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    accessToken,
  });
};

const getMe = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password').exec();

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const currentUser = {
    id: user._id,
    email: user.email,
    name: user.name,
  };

  res.status(200).json(currentUser);
};

export { loginUser, getMe };
