const Type = require("../Model/TypeSchema");
const asyncHandler = require("express-async-handler");


const AddType= asyncHandler(async (req, res, next) => {
  try {
    const type = await Type.create(req.body);
    res.status(201).json({ success: true, data: type });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

const getAllTypes = asyncHandler(async (req, res, next) => {
  try {
    const types = await Type.find();
    res.status(200).json({ success: true, data: types });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
  
const getTypeById = asyncHandler(async (req, res) => {
  const TypeId = req.params._id;

  const tupeId = await Type.findById(TypeId);

  if (!tupeId) {
    return res.status(404).json({
      message: "type not found",
    });
  }

  res.status(200).json(tupeId);
});
  module.exports = {
    AddType,
    getAllTypes,
    getTypeById,
  }