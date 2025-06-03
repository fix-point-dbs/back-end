const { success, error } = require('../../utils/ApiResponser');
const reverseGeocode = async (request, h) => {
    try {
        const lat = parseFloat(request.query.lat);
        const lon = parseFloat(request.query.lon);
  
        if (isNaN(lat) || isNaN(lon)) {
          return h.response({ error: 'Latitude dan longitude harus berupa angka.' }).code(400);
        }
  
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        return h.response(success(data, 'Data berhasil diambil', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err.message, 500)).code(500);
    }
};

module.exports = {
    reverseGeocode,
};