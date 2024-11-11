const User = require('../models/User');
const { generateToken } = require('../middleware/authMiddleware');

const signup = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;

    // Validate input
    if (!email || !password || !phoneNumber) {
      return res.status(400).json({ 
        message: 'Please provide all required fields'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      phoneNumber
    });

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    console.error('Signup error details:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: Object.values(error.errors)[0].message
      });
    }
    
    res.status(500).json({ message: 'Error creating user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

module.exports = {
  signup,
  login
}; 