const Mailgen = require('mailgen')
require('dotenv').config()

class Emailservice {

    constructor(env, sender) {
        this.sender = sender
        switch (env) {
            case 'development':
                this.link = ' https://a37a-176-39-34-195.ngrok.io '
                break;
            case 'produktion':
                this.link = ''
            default:
                this.link = ' https://a37a-176-39-34-195.ngrok.io '
                break
        }
    }
    createTemplateEmail(name, verifyTokenEmail) {
        const mailGenerator = new Mailgen({
            theme: 'cerberus',
            product: {
                name: 'HI-FI',
                link: this.link,
            }
        })
        const email = {
            body: {
                name,
                intro: 'Welcome to Hi-Fi! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with Mailgen, please click here:',
                    button: {
                        color: '#22BC66', 
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyTokenEmail}`
                    },
                },
            },
        }
        return mailGenerator.generate(email)
    }
    async sendVerifyEmail(email, name, verifyTokenEmail) {
        const emailHTML = this.createTemplateEmail(name, verifyTokenEmail)
        const message = {
            to: email,
            subject: 'verify your email',
            html: emailHTML
        }

        try {
            const result = await this.sender.send(message)
            console.log(result)
            return true
        } catch (error) {
            console.log(error.message)
            return false
        }
    }
}
module.exports = Emailservice