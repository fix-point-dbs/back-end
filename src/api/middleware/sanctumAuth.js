const PersonalAccessToken = require('../../models');
const User = require('../../models/User');


const sanctumAuth = async (request, h) => {
  const auth = request.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return h.response({ message: 'Token tidak diberikan' }).code(401).takeover();
  }

  const token = auth.split(' ')[1];
  const tokenRecord = await Token.findOne({ where: { token } });

  if (!tokenRecord) {
    return h.response({ message: 'Token tidak valid' }).code(401).takeover();
  }

  // ✅ Periksa apakah token sudah kadaluwarsa
  if (new Date(tokenRecord.expiresAt) < new Date()) {
    PersonalAccessToken.destroy({ where: { id: tokenRecord.id } });
    return h.response({ message: 'Token sudah kadaluwarsa' }).code(401).takeover();
  }

  const user = await User.findByPk(tokenRecord.userId);
  if (!user) {
    return h.response({ message: 'User tidak ditemukan' }).code(401).takeover();
  }

  request.auth = { user };
  return h.continue;
};

module.exports = sanctumAuth;