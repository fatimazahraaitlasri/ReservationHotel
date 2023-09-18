const express = require("express");
const Router = express.Router();




const {AddType ,getAllTypes,getTypeById} = require("../Controller/TypeController");


Router.post("/RegisterType", AddType).get('/getAllType', getAllTypes).get("/getTypeById/:_id",getTypeById)




module.exports = Router;
