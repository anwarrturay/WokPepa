const User = require("../models/User");
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401); // unauthorised
    const refreshToken = cookies.jwt;
    console.log("Refresh Token", refreshToken);
    const foundUser = await User.findOne({ refreshToken }).exec();
    console.log("Found User", foundUser);
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // forbidden
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                { 
                    "UserInfo":{
                        "username": decoded.username, 
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5h' }
            );
            res.json({ roles, accessToken }) // sending the access token and the roles of the user in a json format
        }
    );
}

module.exports = { handleRefreshToken }