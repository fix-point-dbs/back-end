const {
  Service,
  Photo,
  DetailService,
  Specialist,
  Review,
  User,
  ListServices
} = require("../models");
const { db } = require("../config/database");
const fs = require("fs");
const path = require("path");

const getAll = async (req) => {
  const { status, type } = req.query;
  const where = {};
  if (status) {
    where.status = status;
  }
  if (type) {
    where.type = type;
  }
  const services = await Service.findAll({
    where,
    attributes: {
      include: [
        [
          db.literal(`(
                      SELECT AVG(rating)
                      FROM reviews
                      WHERE reviews.service_id = services.id
                    )`),
          "average_rating",
        ],
        [
          db.literal(`(
                      SELECT COUNT(*)
                      FROM reviews
                      WHERE reviews.service_id = services.id
                    )`),
          "review_count",
        ],
      ],
    },
    include: [
      { model: Specialist },
      { model: Photo },
      { model: DetailService,
        include: { model: ListServices,
         attributes: ["type", "description"]
         }},
    ],
  });
  return services;
};

const getById = async (id) => {
  const service = await Service.findOne({
    where: { id },
    attributes: {
      include: [
        [
          db.literal(`(
                      SELECT AVG(rating)
                      FROM reviews
                      WHERE reviews.service_id = services.id
                    )`),
          "average_rating",
        ],
        [
          db.literal(`(
                      SELECT COUNT(*)
                      FROM reviews
                      WHERE reviews.service_id = services.id
                    )`),
          "review_count",
        ],
      ],
    },
    include: [
      { model: Specialist },
      { model: Photo },
      { model: DetailService,
        include: { model: ListServices,
         attributes: ["type", "description"]
         }},
      {
        model: Review,
        include: [
          {
            model: User,
            attributes: ["name"], // ✅ hanya ambil nama user
          },
        ],
      },
    ],
  });
  return service;
};


const create = async (user_id, data) => {
  const {
    list_service_id,
    specialist_names,
    photos,
  } = data;
  const service = await Service.create({
    user_id: user_id,
    bussiness_name: data.bussiness_name,
    person_responsible: data.person_responsible,
    description: data.description,
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude,
    type: data.type,
    vehicle_type: data.vehicle_type,
    start_price_range: data.start_price_range,
    end_price_range: data.end_price_range,
    year_founded: data.year_founded,
    full_operational: data.full_operational,
    opening_time: data.opening_time,
    closing_time: data.closing_time,
    alternative_phone: data.alternative_phone,
    status: data.status,
  });

  const listServiceArray = list_service_id.split(",").map((id) => id.trim());

  await Promise.all(
    listServiceArray.map((id) =>
      DetailService.create({
        service_id: service.id,
        list_service_id: id,
      })
    )
  );

  const specialistArray = specialist_names
    .split(",")
    .map((name) => name.trim());
  await Promise.all(
    specialistArray.map((name) =>
      Specialist.create({
        service_id: service.id,
        name,
      })
    )
  );

  const uploadDir = path.join(__dirname, "../../uploads/photo-services");

  // Pastikan folder ada
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i]; // ambil file stream
    const ext = path.extname(photo.hapi.filename); // ambil ekstensi file
    const filename = `${Date.now()}-${i}${ext}`; // hindari nama kembar dalam satu loop
    const filepath = path.join(uploadDir, filename);

    const fileStream = fs.createWriteStream(filepath);

    await new Promise((resolve, reject) => {
      photo.pipe(fileStream);
      photo.on("end", resolve);
      photo.on("error", reject);
    });

    // Simpan ke database
    await Photo.create({
      service_id: service.id,
      url_photo: filename, // atau bisa juga simpan relative path jika ingin diakses publik
    });
  }

  return service;
};

const update = async (service_id, data) => {
  const {
    detail_service_types,
    detail_service_descriptions,
    specialist_names,
    specialist_descriptions,
    photos,
  } = data;
  await Service.update(
    {
      bussiness_name: data.bussiness_name,
      person_responsible: data.person_responsible,
      description: data.description,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      type: data.type,
      vehicle_type: data.vehicle_type,
      start_price_range: data.start_price_range,
      end_price_range: data.end_price_range,
      year_founded: data.year_founded,
      full_operational: data.full_operational,
      opening_time: data.opening_time,
      closing_time: data.closing_time,
      alternative_phone: data.alternative_phone,
    },
    { where: { id: service_id } }
  );

  return "berhasil";
};

const destroy = async (service_id) => {
  await DetailService.destroy({ where: { service_id: service_id } });
  await Specialist.destroy({ where: { service_id: service_id } });
  await Photo.destroy({ where: { service_id: service_id } });
  await Service.destroy({ where: { id: service_id } });
  return "berhasil";
};

const updatedStatus = async (service_id, status) => {
  await Service.update(
    {
      status: status,
    },
    { where: { id: service_id } }
  );
  return "berhasil";
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
  updatedStatus
};
