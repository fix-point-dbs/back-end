const { loginService, registerService, logoutService } = require('../../services/authServices');
const { success, error } = require('../../utils/ApiResponser');

const register = async (request, h) => {
  try {
    const user = await registerService('user',request.payload);
    return h.response(success(user, 'success', 201)).code(201);
  } catch (err) {
    return h.response({
      status: 'error',
      message: 'Internal Server Error'+err,
    }).code(500);
  }
};

const login = async (request, h) => {
  try {
    const login = await loginService(request.payload);
    return h.response(success({ login }, 'success', 200)).code(200);
    } catch (error) {
        return h.response({
            status: 'error',
            message: 'Internal Server Error'+error
        }).code(500);
    }
};

const logout = async (request, h) => {

    try {
        const logout = await logoutService(request);
        return h.response(success({ logout }, 'success', 200)).code(200);
    } catch (error) {
        return h.response({
            status: 'error',
            message: 'Internal Server Error'+error
        })   
    }
};


module.exports = { register, login, logout };
