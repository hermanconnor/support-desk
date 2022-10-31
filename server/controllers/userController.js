import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  const userExists = await User.findOne({ email }).lean().exec();
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const hashPwd = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPwd,
  });

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30d' },
  );

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data received');
  }
};

export { registerUser };
