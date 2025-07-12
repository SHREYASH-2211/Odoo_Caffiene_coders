const User = require('../Models/user');

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user
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
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDetail = await User.findOne({ username, password });
    if (userDetail) {
      const userData = {
        _id: userDetail._id,
        name: userDetail.name,
        username: userDetail.username,
        email: userDetail.email,
        type: userDetail.type,
        isPublic: userDetail.isPublic,
        profileImage: userDetail.profileImage,
        createdAt: userDetail.createdAt,
        updatedAt: userDetail.updatedAt,
      };
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: 'Login Failed' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
