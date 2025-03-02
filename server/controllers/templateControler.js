const Template = require("../models/Template");

const getAllAvailableTemplates = async (req, res)=>{
    try{
        const templates = await Template.find();
        if(!templates) return res.status(204).json({ message: "No available templates"});
        res.json(templates); // sending the predefined templates to the authorized client page.
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Server error"})
    }
}

module.exports = getAllAvailableTemplates;