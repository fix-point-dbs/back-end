const { loginService, registerService, logoutService } = require('../../services/authServices');
const { success, error } = require('../../utils/ApiResponser');

const register = async (request, h) => {
  try {
    const user = await registerService('user',request.payload);
    return h.response(success(user, 'success', 201)).code(201);
  } catch (err) {
    return h.response(error({}, "Internal server error "+ err, 500)).code(500);
  }
};

const login = async (request, h) => {
  try {
    const login = await loginService(request.payload);
    return h.response(success({ login }, 'Login berhasil', 200)).code(200);
    } catch (err) {
        return h.response(error({}, "Internal Server Error " + err, 500)).code(500);
    }
};


const logout = async (request, h) => {

    try {
        const logout = await logoutService(request);
        return h.response(success(logout, 'success', 200)).code(200);
    } catch (err) {
        return h.response(error({}, "Logout berhasil", 200)).code(200);   
    }
};


module.exports = { register, login, logout };
