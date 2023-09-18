
const Extra = require('../Model/ExtraSchema'); 

const AddExtras = async (req, res) => {
    try {
        const extra = new Extra(req.body);
        await extra.save();
        res.status(201).send(extra);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAllExtras = async (req, res) => {
    try {
        const extras = await Extra.find();
        res.json(extras);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports={
    AddExtras,
    getAllExtras
}
