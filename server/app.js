const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose")
const cors = require("cors");
const passport = require("passport");
const registerRoute =  require("./routes/register")
const authRoute = require("./routes/auth")
const resumeRoute = require("./routes/resumes");
const profileRoute = require("./routes/users/profile");
const usersRoute = require("./routes/users/users")
const reportRoute = require("./routes/users/reports")
const templateRoute = require("./routes/templates")
const logoutRoute = require("./routes/logout")
const refreshRoute = require("./routes/refresh");
const { logger } = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbconn");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const forgotPassword = require("./routes/forgotPassword");
require('dotenv').config();
require('./config/passport');

connectDB();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(credentials);
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(logger); 

app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.use(express.json({ limit: '10mb' }));


app.use(cookieParser())

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// Public endpoints without user auth.
app.use("/auth", authRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/refresh", refreshRoute);
app.use("/forgot-password", forgotPassword);

app.use(verifyJWT);

// protected routes.
app.use("/templates", templateRoute);
app.use("/resumes", resumeRoute); 
app.use("/users", usersRoute);
app.use("/users/profile", profileRoute); 
app.use("/users/reports", reportRoute)

app.use(errorHandler);

mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
        console.log(`Server is running at port: http://localhost:${PORT}`);
    })
})
