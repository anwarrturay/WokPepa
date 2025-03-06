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

const getSpecificTemplate = async(req, res)=>{
    try{
        const { id } = req.params;
        const foundTemplate = await Template.findById({_id: id}).exec();
        if(!foundTemplate){
            return res.status(404).json({message: "Template Not Found"})
        }
        res.json(foundTemplate); // sending the templaate to the client side.
    }catch(err){
        res.status(500).json({message: "Server error", error: err.message});
        console.error(err);
    }
}

module.exports = {getAllAvailableTemplates, getSpecificTemplate};