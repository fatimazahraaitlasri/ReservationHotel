const Manager = require("../Manager/Model/ManagerSchema");
// const Reservation = require('./path-to-your-reservation-model');
const Chambre = require("../Chambre/Model/ChambreSchema");
const asyncHandler = require("express-async-handler");
const Reservation = require("../Reservation/Reservationshcema");
const Type = require("../TypeChambre/Model/TypeSchema");
const stripe = require("../stripe");
const ExtraSchema = require("../extra/Model/ExtraSchema");
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: "YOUR-PAYPAL-CLIENT-ID",
  client_secret: "YOUR-PAYPAL-CLIENT-SECRET",
});
const addReservation = asyncHandler(async (req, res) => {
  // Trouvez les extras à partir des IDs fournis dans req.body.extras
  const extras = await ExtraSchema.find({ _id: { $in: req.body.extras } });

  // Déstructurez les autres champs de req.body
  const { name, email, roomId, paymentMethod, startDate, endDate } = req.body;

  // Vérifiez que tous les champs nécessaires sont présents
  if (!email || !name || !roomId || !paymentMethod || !startDate || !endDate) {
    return res.status(400).send("Veuillez ajouter tous les champs requis");
  }

  // Trouvez la chambre à partir de l'ID roomId
  const room = await Chambre.findById(roomId);

  // Trouvez le type de chambre et son prix à partir de l'ID du type de la chambre
  const type = await Type.findById(room.Type);
  const roomTypePrice = type.price;

  // Calculez le montant total des extras
  const extrasTotalAmount = extras.reduce(
    (total, extra) => total + extra.price,
    0
  );

  // Calculez le montant total (extras + prix du type de chambre)
  const totalAmount = extrasTotalAmount + roomTypePrice;

  // Créez une nouvelle réservation avec le montant total calculé
  const reservation = await Reservation.create({
    name,
    email,
    roomId,
    extras: req.body.extras,
    totalAmount,
    paymentMethod,
    startDate,
    endDate,
  });

  // Envoyez la réponse
  if (reservation) {
    res.status(200).json(reservation);
  } else {
    res.status(400).send("Réservation non effectuées");
  }
});

const handlePayment = asyncHandler(async (req, res) => {
  try {
    const { reservationId, paymentId } = req.body;

    // Trouvez la réservation correspondante dans votre base de données
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).send("Réservation introuvable");
    }

    // Vérifiez si la réservation a déjà été payée
    if (reservation.isPaid) {
      return res.status(400).send("Cette réservation a déjà été payée");
    }

    // Mettez à jour l'état de la réservation pour indiquer qu'elle a été payée
    reservation.isPaid = true;

    // Enregistrez l'ID de paiement PayPal pour référence future
    reservation.paymentId = paymentId;

    // Sauvegardez la réservation mise à jour dans la base de données
    await reservation.save();

    res.status(200).send("Paiement enregistré avec succès");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
});

const getStatsForAllManagers = async (req, res) => {
  try {
    const timeframe = req.query.timeframe || "year";

    // Trouver tous les managers
    const managers = await Manager.find();
    if (!managers.length) {
      return res.status(404).send({ error: "No managers found" });
    }

    const statsForAllManagers = [];

    for (const manager of managers) {
      // Trouver toutes les chambres correspondant au type du manager
      const chambres = await Chambre.find({ Type: manager.Type });
      const chambreIds = chambres.map((chambre) => chambre._id);

      // Agrégation pour obtenir les statistiques
      const pipeline = [
        {
          $match: {
            roomId: { $in: chambreIds },
            isPaid: true, // seulement les réservations payées
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: timeframe === "month" ? { $month: "$createdAt" } : null,
            },
            totalSales: { $sum: "$totalAmount" },
            totalReservations: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ];

      if (timeframe === "year") {
        pipeline[1].$group._id.month = null;
      }

      const stats = await Reservation.aggregate(pipeline);

      statsForAllManagers.push({
        managerId: manager._id,
        managerType: manager.Type,
        chambres,
        stats,
      });
    }

    return res.status(200).send(statsForAllManagers);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// const getAvailableRoomsForDate = async (req, res) => {
//   const dateToCheck = new Date(req.body.specificDate);

//   const reservedRooms = await Reservation.find({
//     startDate: { $lte: dateToCheck },
//     endDate: { $gte: dateToCheck },
//   }).select("roomId");

//   const reservedRoomIds = reservedRooms.map((room) => room.roomId);
//   const availableRooms = await Chambre.find({ _id: { $nin: reservedRoomIds } });
//   res.send(availableRooms);
//   console.log(availableRooms);
// };
const getAvailableRoomsForDate = async (req, res) => {
  try {
    const dateToCheck = new Date(req.body.specificDate);
    const roomType = req.body.roomType; // Récupérez le type de chambre à partir de la requête

    // Trouver les réservations qui ont lieu pendant la date spécifiée
    const reservedRooms = await Reservation.find({
      startDate: { $lte: dateToCheck },
      endDate: { $gte: dateToCheck },
    }).select("roomId");

    // Obtenir les IDs des chambres réservées
    const reservedRoomIds = reservedRooms.map((room) => room.roomId);
    const typechambre = await Type.findOne({ typeName: roomType });
    console.log(roomType);
    // Trouver les chambres qui ne sont pas dans la liste des chambres réservées et populer les données de type
    // const books = await Book.find({ author: author._id });
    const availableRooms = await Chambre.find({
      _id: { $nin: reservedRoomIds },
      Type: typechambre._id// Ici, nous ajoutons un filtre basé sur le type de chambre
    })
      .populate("Type") // On peuple les informations du type
      .exec();

    // Envoyer les chambres disponibles avec leurs types
    console.log(availableRooms);
    res.status(200).send(availableRooms);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

// Utilisation de la fonction :

module.exports = {
  addReservation,
  handlePayment,
  getStatsForAllManagers,
  getAvailableRoomsForDate,
};
