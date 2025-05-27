const { User, PersonalAccessToken } = require('../models');
const getUser = async (data) => {
    const auth = data.headers.authorization;
    const token = auth.split(' ')[1];

    const user = await PersonalAccessToken.findOne({ where: { token: token } });
    if (!user) {
        throw new Error('Token not found');
    }
    return user.user_id;
}

module.exports = { getUser };