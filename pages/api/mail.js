const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const message = `
    Name: ${body.name}\r\n
    Email: ${body.mail}\r\n
    Message: ${body.message}
  `;

  await mail.send({
    to: "post@pokerlighthouse.com",
    from: {
      email: "post@pokerlighthouse.com",
      name: "PokerLighthouse",
    },
    subject: "New Message!",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  });

  res.status(200).json({ status: "Ok" });
};
