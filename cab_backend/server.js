const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.post('/api/book', (req, res) => {
  const { source, destination, cab } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@example.com',
      pass: 'your_email_password',
    },
  });
  const mailOptions = {
    from: 'from_email@example.com',
    to: 'to_email@example.com',
    subject: 'Cab booking confirmation',
    html: `<p>Your booking details are:</p><p>Source: ${source}</p><p>Destination: ${destination}</p><p>Cab: ${cab}</p><p>Time taken: ${time} minutes</p><p>Estimated cost: ${cost} USD</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Failed to send email notification');
    } else {
      console.log('Email notification sent: ' + info.response);
      res.send({ time, cost });
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


