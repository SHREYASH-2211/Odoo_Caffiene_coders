const User = require('../Models/user');

exports.getUserById = async (req, res) => {
    try {
        const userId = await User.findById(req.params.id);
        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ userId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const savedUser = new User(req.body);
        await savedUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDetail = await User.findOne({ username, password });
        if (userDetail) {
            const temp = {
                userId: userDetail.id,
                name: userDetail.name,
                username: userDetail.username,
                email: userDetail.email,
                isAdmin: userDetail.isAdmin,
                createdAt: userDetail.createdAt,
                updatedAt: userDetail.updatedAt,
                profilePicture: userDetail.profilePicture,
                phone: userDetail.phone,
                type: userDetail.type
            };
            res.send(temp);
        } else {
            res.status(404).json({ message: 'Login Failed' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};