import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    return axios
      .put(
        "https://api.sendgrid.com/v3/marketing/contacts",
        {
          contacts: [{ email: `${req.body.mail}` }],
          list_ids: [process.env.SENDGRID_MAILING_ID_NEWSLETTER],
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          },
        }
      )
      .then((result) => {
        res.status(200).send({
          message: "Your email has been added to the mailing list. Welcome 👋",
        });
        res.end();
      })
      .catch((err) => {
        res.status(500).send({
          message: "Oups, there was a problem, please try again or contact us",
        });
        res.end();
      });
  }
}
