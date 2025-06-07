const { User, Service, Booking } = require('../../models');
const { db }= require('../../config/database');
const { success, error } = require('../../utils/ApiResponser');
const statistics = async (request, h) => {
    const { type } = request.query;

    try {
        let result;
  
        switch (type) {
          case 'user':
            result = await User.count(); // jumlah user
            break;
          case 'pengajuan':
            result = await Service.count({ where: { status: 'pending' } }); // asumsi role = 'mitra'
            break;
          case 'service':
            result = await Service.count(); // jumlah layanan
            break;
          case 'booking':
            result = await Booking.count(); // jumlah booking
            break;
          case 'all':
            const [userCount, pengajuanCount, serviceCount, bookingCount] = await Promise.all([
              User.count({ where: { role: 'user' } }),
              Service.count({ where: { status: 'pending' } }),
              Service.count(),
              Booking.count()
            ]);
            result = {
              user: userCount,
              pengajuan: pengajuanCount,
              service: serviceCount,
              booking: bookingCount
            };
            break;
          default:
            return h.response({ error: 'Invalid type parameter' }).code(400);
        }
  
        return h.response(success(result, 'Data berhasil diambil', 200)).code(200);
      } catch (err) {
        console.error(err);
        return h.response(error({}, err, 500)).code(500);
      }
}

const getMonthlyBookingStats = async (request, h) => {
  try {
    const results = await Booking.findAll({
      attributes: [
        [db.Sequelize.fn('DATE_FORMAT', db.Sequelize.col('created_at'), '%Y-%m'), 'year_month'],
        [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'total']
      ],
      where: db.Sequelize.where(
        db.Sequelize.col('created_at'),
        '>=',
        db.Sequelize.literal("DATE_SUB(NOW(), INTERVAL 6 MONTH)")
      ),
      group: ['year_month'],
      order: [[db.Sequelize.fn('DATE_FORMAT', db.Sequelize.col('created_at'), '%Y-%m'), 'DESC']],
      limit: 6,
      raw: true
    });

    const formattedResults = results.map(row => {
      const [year, month] = row.year_month.split('-');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return {
        month: `${monthNames[parseInt(month) - 1]} ${year}`,
        total: parseInt(row.total)
      };
    });

    return h.response(success(formattedResults, 'Data berhasil diambil', 200)).code(200);
  } catch (err) {
    console.error(err);
    return h.response(error({}, err, 500)).code(500);
  }
}

module.exports = {statistics, getMonthlyBookingStats};