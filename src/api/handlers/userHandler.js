const User = require('../../models/User');

const getUsers = async (request, h) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 'success', data: users };
};

const getUserById = async (request, h) => {
  const { id } = request.params;
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) {
    return h.response({ status: 'fail', message: 'User tidak ditemukan' }).code(404);
  }

  return { status: 'success', data: user };
};

const createUser = async (request, h) => {
  const { name, email, password } = request.payload;
  try {
    const user = await User.create({ name, email, password });
    return h.response({ status: 'success', data: { id: user.id, name, email } }).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ status: 'fail', message: 'Gagal menambahkan user' }).code(500);
  }
};

const updateUser = async (request, h) => {
  const { id } = request.params;
  const { name, email } = request.payload;
  const user = await User.findByPk(id);

  if (!user) {
    return h.response({ status: 'fail', message: 'User tidak ditemukan' }).code(404);
  }

  await user.update({ name, email });
  return { status: 'success', message: 'User berhasil diperbarui' };
};

const deleteUser = async (request, h) => {
  const { id } = request.params;
  const user = await User.findByPk(id);

  if (!user) {
    return h.response({ status: 'fail', message: 'User tidak ditemukan' }).code(404);
  }

  await user.destroy();
  return { status: 'success', message: 'User berhasil dihapus' };
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
