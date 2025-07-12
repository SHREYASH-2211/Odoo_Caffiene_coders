const User = require('../Models/user');
const bcrypt = require('bcrypt');

// ✅ Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get user by email (case-insensitive)
exports.getUserByEmail = async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email); // handle URL encoding
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Create new user (with hashed password)
exports.createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...rest, password: hashedPassword });
    const savedUser = await user.save();
    const { password: _, ...userData } = savedUser.toObject();
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          skillsOffered: req.body.skillsOffered,
          skillsWanted: req.body.skillsWanted,
          availability: req.body.availability,
          type: req.body.type,
          isPublic: req.body.isPublic,
          profileImage: req.body.profileImage,
        }
      },
      { new: true }
    );

    const { password, ...userData } = updatedUser.toObject();
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Login user (with bcrypt compare)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDetail = await User.findOne({ email });
    if (!userDetail) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, userDetail.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const { password: _, ...userData } = userDetail.toObject();
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
