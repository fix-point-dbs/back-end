const { User } = require("../../models");
const { success, error } = require("../../utils/ApiResponser");
const bcrypt = require('bcrypt');
const getUsers = async (request, h) => {
  try {
    const users = await User.findAll();
    return h.response(success(users, "Data berhasil diambil", 200)).code(200);
  } catch (error) {
    return h.response(error({}, error.message, 500)).code(500);
  }
};

const getUserById = async (request, h) => {
  try {
    const { id } = request.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return h
        .response({ status: "fail", message: "User tidak ditemukan" })
        .code(404);
    }

    return h.response(success(user, "Data berhasil diambil", 200)).code(200);
  } catch (error) {
    return h.response(error({}, error.message, 500)).code(500);
  }
};

const createUser = async (request, h) => {
  const { name, email, password, phone } = request.payload;
  try {
    const user = await User.create({ name, email, password, phone });
    return h
      .response(success(user, "User berhasil ditambahkan", 201))
      .code(201);
  } catch (err) {
    console.error(err);
    return h.response(error({}, err, 500)).code(500);
  }
};

const updateUser = async (request, h) => {
  try {
    const { id } = request.params;
    const { name, email, phone } = request.payload;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return h
        .response({ status: "fail", message: "User tidak ditemukan" })
        .code(404);
    }

    await user.update({ name, email, phone });
    

    return h.response(success(user, "User berhasil diperbarui", 200)).code(200);
  } catch (error) {
    return h.response(error({}, error.message, 500)).code(500);
  }
};

const changePassword = async (request, h) => {
  try {
    const { id } = request.params;
    const { oldPassword, newPassword } = request.payload;
    const user = await User.findByPk(id);

    if(!await bcrypt.compare(oldPassword, user.password)) {
      return h.response({ status: "fail", message: "Password salah" }).code(400);
    }


    if (!user) {
      return h
        .response({ status: "fail", message: "User tidak ditemukan" })
        .code(404);
    }

    await user.update({ password: await bcrypt.hash(newPassword, 10) });

    return h.response(success(user, "Password berhasil diperbarui", 200)).code(200);
  } catch (err) {
    return h.response(error({}, err.message, 500)).code(500);
  }
};

const deleteUser = async (request, h) => {
  const { id } = request.params;
  const user = await User.findByPk(id);

  if (!user) {
    return h
      .response({ status: "fail", message: "User tidak ditemukan" })
      .code(404);
  }

  await user.destroy();
  return h.response(success(user, "User berhasil dihapus", 200)).code(200);;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changePassword
};
