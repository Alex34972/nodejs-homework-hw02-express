const nodemailer = require('nodemailer')
require('dotenv').config()


class createSenderNodemailer{
    async send(msg){
        const config = {
            host: 'smtp.meta.ua',
            port: 465,
            secure: true,
            auth: {
              user: 'terry_cat@meta.ua',
              pass: process.env.PASSWORD,
            },
          }
        const transporter = nodemailer.createTransport(config) 
        return await transporter.sendMail({...msg, from:' terry_cat@meta.ua'})
    }
}

module.exports = createSenderNodemailer