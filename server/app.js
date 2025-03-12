const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const registerRoute =  require("./routes/register")
const authRoute = require("./routes/auth")
const resumeRoute = require("./routes/resumes");
const profileRoute = require("./routes/users/profile");
const usersRoute = require("./routes/users/users")
const templateRoute = require("./routes/templates")
const logoutRoute = require("./routes/logout")
const { logger } = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbconn");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
require('dotenv').config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(credentials);
app.use(cors(corsOptions));

app.use(logger); // custom logger for logging req methods and url accessing our rest api.

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));// middleware for parsing form data.

app.use("/auth", authRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use(verifyJWT);
app.use("/templates", templateRoute);
app.use("/resumes", resumeRoute); // create resume route.
app.use("/users", usersRoute);
app.use("/users/profile", profileRoute); 

app.use(errorHandler);
mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
        console.log(`Server is running at port: http://localhost:${PORT}`);
    })
})
