const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { User, PersonalAccessToken } = require('../models');
const { name } = require('../models/User');

const registerService = async (data) => {
    const checkPhone = await User.findAll({ where: { phone: data.phone }});
    const checkEmail = await User.findAll({ where: { email: data.email } })
    if(checkPhone.length > 0) throw new Error('Nomor telepon sudah terdaftar');
    if(checkEmail.length > 0) throw new Error('Email sudah terdaftar');
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
         name: data.name, 
         email: data.email, 
         password: hashedPassword, 
         role: data.role, 
         phone: data.phone 
    });
    return user;
}

const loginService = async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ where: { email:email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Email atau Password Salah")
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const token = uuidv4();
    await PersonalAccessToken.create({ token, user_id: user.id, expiresAt });

    const res = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        token: token
    }
    return res;
}

const logoutService = async (data) => {
    const auth = data.headers.authorization;
    const token = auth.split(' ')[1];
    await PersonalAccessToken.destroy({ where: { token } });
    return { status: 'success', message: 'Logout berhasil' };
}

module.exports = {
    registerService,
    loginService,
    logoutService
}