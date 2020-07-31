const mailer = require('nodemailer')
const smtp = require('nodemailer-smtp-transport')

const sendEmail = async data => {
  const { userEmail, subject, text, html } = data
  await process.env
  const transporter = mailer.createTransport(
    smtp({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    }),
  )
  try {
    let mailInfor = await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: userEmail.join(','),
      subject,
      text: text || 'test',
      html,
    })
    console.log(mailInfor,html);
    
    return mailInfor
  } catch (error) {
      console.log(error); 
  }
}
module.exports = sendEmail
