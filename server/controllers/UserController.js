const User = require('../models/UserModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SendEmail = require('../utils/SendEmail')

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: "User does not exist" });

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.status(200).json({
            message: "Authenticated",
            token: token,
            data: {
                name: user.name,
                email: user.email,
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server Error !" });
    }
};

const Register = async (req, res) => {
    try {
        const { username, email, password } = new User(req.body);

        let user = await User.findOne({ email: email });

        if (user) return res.status(400).json({ message: "Email already in use!" });

        user = new User({
            username,
            email,
            password
        });

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '365d' });

        const link = `${process.env.URL}/api/auth/activate/${token}`;
        const subject = "Activate your account";
        const text = `Click on this link <a href =  "${link}">here</a> to activate your account.`;

        // Assuming sendMail is a function to send emails
        await SendEmail({ email: user.email, subject: subject, message: text });

        res.status(201).json(user);

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server Error !" });
    }
};


const ActivateAccount = async (req, res) => {
    const { id: token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
        return res.status(400).json()({ message: "Invalid activation link" });

    const { id } = decoded;
    try {
        let user = await User.findById(id);
        if (!user) return res.status(400).json({ message: "No such user found." });

        if (user.isVr)
            return res.status(400).json({ message: "User already verified ! " });

        await User.updateOne({ id }, { "isVr": true });

        res.status(200).json({ message: "Successfully Verified!" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
        User.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    };
};

module.exports = {
    Register,
    Login,
    ActivateAccount
}