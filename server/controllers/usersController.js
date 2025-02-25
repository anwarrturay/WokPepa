const User = require("../models/User");
const bcrypt = require("bcrypt");
const upload = require("../middleware/multerConfig");

const getAllUsers = async (req, res) =>{
    const users = await User.find();
    res.json(users);
}

const updateUserDetails = async (req, res)=>{
    try{   
        const { firstname, lastname, email, telephone, password, profession } = req.body;
        const id = req.params.id

        const updateData = { firstname, lastname, email, telephone, password, profession };

        if(password) {
            const hashedPwd = await bcrypt.hash(password, 10);
            updateData.password = hashedPwd
        }

        if (req.file) {
            updateData.image = req.file.buffer; // Save image path in DB
        }
    
        const specificUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Returns updated user & runs schema validation
        );
        if (!specificUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated successfully", data: specificUser });
        
    }catch(err){
        console.error(err);
        return res.status(500).json({message: "Server error", error: err.message});
    }
}

const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("User Id to be deleted:", id);

        // Find and delete the user
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err.message);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { updateUserDetails, getAllUsers, deleteUsers };