const User = require("../models/User");
const bcrypt = require("bcrypt");
const upload = require("../middleware/multerConfig");
const fs = require("fs");
const path = require("path");

const getAllUsers = async (req, res) =>{
    const users = await User.find();
    res.json(users);
}

const getSpecificUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const foundUser = await User.findById(id).exec();
        
        if (!foundUser) {
            return res.status(404).json({ message: "User Not Found" });
        }
        
        return res.status(200).json(foundUser);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const updateUserDetails = async (req, res) => {
    try {   
        const { firstname, lastname, email, telephone, password, profession } = req.body;
        const id = req.params.id;

        const updateData = { firstname, lastname, email, telephone, password, profession };

        if (password) {
            const hashedPwd = await bcrypt.hash(password, 10);
            updateData.password = hashedPwd;
        }

        // Fetch the existing user to get the old image
        const specificUser = await User.findById(id);
        if (!specificUser) return res.status(404).json({ message: "User not found" });

        if (req.file) {
            // Delete old image if it exists
            if (specificUser.image) {
                const oldImagePath = path.join(__dirname, "..", "uploads", specificUser.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); // Delete old image
                }
            }
            updateData.image = `/uploads/${req.file.filename}` // Save new image filename to DB
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        res.status(200).json({ message: "User updated successfully", data: updatedUser });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

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

module.exports = { updateUserDetails, getAllUsers, deleteUsers, getSpecificUser };