const sgMail = require('@sendgrid/mail')
require('dotenv').config()

class CreateSenderSendGrid {
    async send(msg) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        return await sgMail
        .send({ ...msg, from: 'alexhifi2203@gmail.com'})
    }
}

module.exports = CreateSenderSendGrid 