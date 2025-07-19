const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");


const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "src")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// POST route for form submissio
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure your mail server (example: Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "namratha.karkera30@gmail.com",       // 🔁 replace with your Gmail
        pass: "wxvb ownq tsbl puuj",          // 🔁 use App Password (not your normal password)
      },
    });

    const mailOptions = {
      from: email,
      to: "namratha.karkera30@gmail.com",           // 🔁 where you want to receive messages
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
