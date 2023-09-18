const asyncHandler = require("express-async-handler");
const Chambre = require("../Model/ChambreSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const fs = require("fs");
const sharp = require("sharp");

const AddRoom = asyncHandler(async (req, res) => {
  const { num, capacity, testImage } = req.body;
  const { file } = req;
  console.log(req.file);
  console.log(req.body);
  if (!num || !capacity) {
    res.status(400).send("please add all fields");
  }
  const ChambreExists = await Chambre.findOne({ num });
  if (ChambreExists) {
    return res.status(409).send("Chambre Already Exist. Please Login");
  }
  const imageName = `${Date.now()}-${file.originalname}`;
  await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toFile(`./images/${imageName}`);
  console.log(imageName);
  console.log(imageName);
  const chambre = await Chambre.create({
    Type: req.body.Type,
    num,
    capacity,
    testImage: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });

  if (chambre) {
    res.status(200).json(chambre);
  } else {
    res.status(401).json({
      message: "chambre not created",
    });
    throw new Error("Invalid client data");
  }
});

const UpdateRoom = asyncHandler(async (req, res) => {
  const chambreId = req.params._id;
  const { num, capacity } = req.body;

  const updatedFields = {};

  if (num) updatedFields.num = num;
  if (capacity) updatedFields.capacity = capacity;

  // Traitement de l'image avec sharp (comme dans AddRoom)
  if (req.file) {
    const imageName = `${Date.now()}-${req.file.originalname}`;
    await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toFile(`./images/${imageName}`);
    updatedFields.imageName = imageName;
  }

  const updatedChambre = await Chambre.findByIdAndUpdate(
    chambreId,
    { $set: updatedFields },
    { new: true }
  );

  if (!updatedChambre) {
    return res.status(404).json({
      message: "Chambre not found",
    });
  }

  res.status(200).json({
    message: "Chambre updated successfully",
    chambre: updatedChambre,
  });
});

const deleteChambre = asyncHandler(async (req, res) => {
  const chambreId = req.params._id;

  const deletedChambre = await Chambre.findByIdAndDelete(chambreId);

  if (!deletedChambre) {
    return res.status(404).json({
      message: "Chambre not found",
    });
  }

  res.status(200).json({
    message: "Chambre deleted successfully",
  });
});

const getAllChambre = asyncHandler(async (req, res) => {
  const chambres = await Chambre.find();

  res.status(200).json(chambres);
});

const getChambreById = asyncHandler(async (req, res) => {
  const chambreId = req.params._id;

  const chambre = await Chambre.findById(chambreId);

  if (!chambre) {
    return res.status(404).json({
      message: "Chambre not found",
    });
  }

  res.status(200).json(chambre);
});

module.exports = {
  AddRoom,
  UpdateRoom,
  getChambreById,
  getAllChambre,
  deleteChambre,
};
