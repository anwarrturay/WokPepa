const User = require("../models/User");
const bcrypt = require("bcrypt");
const upload = require("../middleware/multerConfig");
const generateToken = require("./generateTokenController");
const sendMail = require("../service/sendEmail");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const { v4: uuidv4 } = require("uuid");

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
            try {
                // Upload new image to Cloudinary
                const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: "wokpepa-userprofiles",
                    public_id: uuidv4()
                });

                // Delete old image from Cloudinary if it exists
                if (specificUser.cloudinaryId) {
                    try {
                        await cloudinary.uploader.destroy(specificUser.cloudinaryId);
                    } catch (cloudinaryError) {
                        console.error("Error deleting old image from Cloudinary:", cloudinaryError);
                        // Continue execution even if delete fails
                    }
                }

                // Clean up local file after successful upload
                fs.unlinkSync(req.file.path);

                // Update with new image details
                updateData.image = cloudinaryResult.secure_url;
                updateData.cloudinaryId = cloudinaryResult.public_id;
            } catch (uploadError) {
                // Clean up local file if upload fails
                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
                throw new Error(`Image upload failed: ${uploadError.message}`);
            }
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

const forgotPassword = async (req, res)=>{
    console.log(req?.body?.email);
    try{
        const { email } = req?.body;
        if(!email) return res.status(404).json({message: "email not found"})
        const userFound = await User.findOne({ email }).exec();
        if(!userFound) return res.status(404).json({message: `User with ${email} doesnot exist `})

        const token = generateToken();
        // console.log(token);
        userFound.resetToken = token;
        userFound.tokenExpiry = Date.now() + 3600000;

        const savedUser = await userFound.save();
        // console.log("Saved User", savedUser);
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

        await sendMail(email, 'Password Reset', resetLink)
        res.status(200).json({ message: 'Password reset link sent to your email', ResetLink: resetLink});
    }catch(err){
        res.sendStatus(500);
    }
}

module.exports = { updateUserDetails, getAllUsers, deleteUsers, getSpecificUser, forgotPassword };