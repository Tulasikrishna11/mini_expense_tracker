const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

exports.updateUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
        const updatedUser = await User.update(req.params.id, username, password ? await bcrypt.hash(password, 10) : user.password);
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
