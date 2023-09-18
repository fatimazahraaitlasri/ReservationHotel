const express = require("express");
const Router = express.Router();



const { AddExtras , getAllExtras} = require("../Controller/ControllerExtra");

Router.post("/AddExtras", AddExtras).get("/getAllExtras",getAllExtras)



module.exports = Router;
