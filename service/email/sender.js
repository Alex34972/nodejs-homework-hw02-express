const sgMail = require('@sendgrid/mail')
require('dotenv').config()

class CreateSenderSendGrid {
    async send(message) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        return await sgMail
        .send({ ...message, from: 'terry_cat@meta.ua'})
        .then(() => {
            console.log(message)
          })
    }
}

module.exports = CreateSenderSendGrid 