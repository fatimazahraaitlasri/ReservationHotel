const express = require("express");
const Router = express.Router();
const multer = require("multer");
const path = require("path");
const sharp = require('sharp');
// const isAdmin = require("../../Admin/Middleware/AdminMiddleware")
const { protectAdmin } = require("../Middleware/AdminMiddleware");

const { registerAdmin, loginAdmin} = require("../Controller/AdminController");
const {
  AddManager,
  UpdateManager,
  deleteManager,
  getAllManager,
  getManagerById,
} = require("../../Manager/Controller/ManagerController");
const { AddRoom ,UpdateRoom ,deleteChambre , getAllChambre , getChambreById} = require("../../Chambre/Controller/ChambreController");

// const Storege = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb(null, path.resolve(__dirname, "uploads"));
//     cb(null, "uploads");
//     // console.log(path.resolve(__dirname, "uploads"));
//     console.log(" test test test ");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: Storege });
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a valid image file'))
    }
    cb(undefined, true)
  }
})
Router.post("/Register", registerAdmin)
  .post("/login", loginAdmin)
  .post("/AddManager", protectAdmin, AddManager)
  .put("/updateManager/:_id", protectAdmin, UpdateManager)
  .delete("/DeleteManager/:_id", protectAdmin, deleteManager)
  .get("/getAllManager", protectAdmin, getAllManager)
  .get("/getManagerByID/:_id", protectAdmin, getManagerById)
.post("/AddRoom", upload.single("testImage") , AddRoom)
.put('/UpdateRoom/:_id',upload.single('testImage'),UpdateRoom)
.delete('/deleteChambre/:_id',upload.single('testImage'),deleteChambre)
.get('/getAllChambre',upload.single('testImage'),getAllChambre) 
.get('/getChambreById/:_id',upload.single('testImage'),getChambreById)


module.exports = Router;
