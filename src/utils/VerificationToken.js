const { User } = require('../models');
const getUser = async (token) => {
    const user = await User.findOne({ where: { token } });
    return user;
}

module.exports = { getUser };