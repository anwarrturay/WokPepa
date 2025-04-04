const sendReportEmail = require("../service/sendReportEmail");
const User = require("../models/User")
const reportEmail = async (req, res)=>{
    const { reportType, description } = req.body;
    const { id } = req.params;

    const specificUser = await User.findById(id);

    if(!specificUser) return res.status(404).json({message: "Not found"});

    console.log(specificUser);

    const { email } = specificUser;
    console.log(email);

    if (!reportType || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const emailSent = await sendReportEmail(email, reportType, description);

    if (emailSent) {
        res.status(200).json({ message: "Report submitted successfully" });
    } else {
        res.status(500).json({ message: "Failed to send report email" });
    }
}

module.exports = reportEmail;