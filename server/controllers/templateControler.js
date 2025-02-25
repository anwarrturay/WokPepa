const Template = require("../models/Template");

const getAllAvailableTemplates = async (req, res)=>{
    const templates = await Template.find() // getting the rest of available templates from the json
    if(!templates) return res.status(204).json({ message: "No available templates"});
    res.json(templates); // responding the available templates.
}

module.exports = getAllAvailableTemplates;