const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  res.send('Register Route');
};

const loginUser = async (req, res) => {
  res.send('Login Route');
};

export { registerUser, loginUser };
