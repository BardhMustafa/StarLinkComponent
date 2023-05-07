import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Get the form data from the request body
  const { name, email, phone, message } = req.body;

  // Create a new transporter for sending the email
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true,
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: 'your-email@example.com',
      to: 'recipient-email@example.com',
      subject: 'New message from contact form',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Return a success message to the client
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    // Return an error message to the client
    res.status(500).json({ message: 'Failed to send message.' });
  }
}
