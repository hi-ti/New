const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
	// console.log(options);
	const transporter = nodemailer.createTransport({
		service: process.env.SMTP_SERVICE,
		auth: {
			user: process.env.SMTP_EMAIL,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	const message = {
		from: `${process.env.FROM_NAME} <${process.env.SMTP_EMAIL}>`,
		to: options.email,
		subject: options.subject,
		html: options.message,
	};

	const info = transporter.sendMail(message);

	console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
