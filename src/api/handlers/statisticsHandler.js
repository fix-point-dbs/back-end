const { User, Service, Booking } = require('../../models');
const statistics = async (request, h) => {
    const { type } = request.query;

    try {
        let result;
  
        switch (type) {
          case 'user':
            result = await User.count(); // jumlah user
            break;
          case 'mitra':
            result = await User.count({ where: { role: 'mitra' } }); // asumsi role = 'mitra'
            break;
          case 'service':
            result = await Service.count(); // jumlah layanan
            break;
          case 'booking':
            result = await Booking.count(); // jumlah booking
            break;
          case 'all':
            const [userCount, mitraCount, serviceCount, bookingCount] = await Promise.all([
              User.count({ where: { role: 'user' } }),
              User.count({ where: { role: 'mitra' } }),
              Service.count(),
              Booking.count()
            ]);
            result = {
              user: userCount,
              mitra: mitraCount,
              service: serviceCount,
              booking: bookingCount
            };
            break;
          default:
            return h.response({ error: 'Invalid type parameter' }).code(400);
        }
  
        return { count: result };
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Internal Server Error' }).code(500);
      }
}

module.exports = {statistics};