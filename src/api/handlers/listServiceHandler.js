const { ListServices } = require("../../models");
const {  success, error } = require ("../../utils/ApiResponser");
const getListServices = async (request, h) => {
    try {
        const response = await ListServices.findAll();
        return h.response(success(response, 'Data berhasil diambil', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err.message, 500)).code(500);
    }
}

module.exports = {
    getListServices
}
