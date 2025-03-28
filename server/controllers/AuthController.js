const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password ) return res.status(400).json({message: "email and password are required!"});

    const matchUser = await User.findOne({ email }).exec();
    if(!matchUser) return res.sendStatus(401)

    const matchedPassword = await bcrypt.compare(password, matchUser.password);
    if(!matchedPassword) return res.sendStatus(401);

    if(matchedPassword){
        // creating a accesstoken secret that's gonna be issued to each legitimate user.
        const roles = Object.values(matchUser.roles).filter(Boolean); // roles of foundUser.
        const accessToken = jwt.sign(
            {
                UserInfo:{
                    id: matchUser._id,
                    email: matchUser.email,
                    roles: roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5h"}
        )

        const refreshToken = jwt.sign(
            {
                id: matchUser._id,
                tokenType: "refresh"
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "10d"}
        )

        // saving the refreshToken we say.
        matchUser.refreshToken = refreshToken;
        await matchUser.save() // saving refreshToken to the database after user auth.

        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: "None", secure: process.env.NODE_ENV === "production", maxAge: 24 * 60 * 60 * 1000})

        res.status(200).json({ accessToken }); // sending the accessToken. 
    }
}

module.exports = handleLogin;