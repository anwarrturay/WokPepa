const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const upload = require("../middleware/multerConfig.js");

const registerNewUser = async (req, res, next) => {
  const { firstname, lastname, email, password, telephone, profession } = req.body;

  // Check for missing fields
  if (!firstname || !lastname || !email || !telephone || !password || !profession || !req.file)
    return res
      .status(400)
      .json({ message: "Please fill in the above details. They are required." });
  
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.sendStatus(409); // Conflict: Email already exists
      
  try {

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "telephone": telephone,
      "password": encryptedPassword,
      "profession": profession,
      "image": { data: req.file.buffer, contentType: req.file.mimetype }
    })
    const result = await newUser.save();
    console.log(result);

    res.status(201).json({ "success": `A new user ${firstname} ${lastname} was created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

module.exports = registerNewUser;
