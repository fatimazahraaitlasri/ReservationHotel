const express = require("express");
const Router = express.Router();

const { protectAdmin } = require("../Admin/Middleware/AdminMiddleware");


const {addReservation , handlePayment ,getAvailableRoomsForDate,getStatsForAllManagers} = require("./controller");


Router.post("/addReservation", addReservation).post("/handlePayment", handlePayment).post('/getAvailableRooms',getAvailableRoomsForDate).get('/getStatsForManager',protectAdmin,getStatsForAllManagers)
 


module.exports = Router;
