const { verify } = require('crypto');
const Mailgen = require('mailgen')

class Emailservice{

    constructor(env,sender){
        this.sender=sender
        switch (env) {
            case 'development':
                this.link = 'http://localhost:8000'               
                break;
            case 'produktion':
                this.link = 'linc for production'
            default:
                break
        }
    }
    createTemplateEmail(name, verifyTokenEmail){
      const mailGenerator = new Mailgen({
            theme: 'cerberus',
            product: {
                name: 'HI-FI',
                link: this.link
            }
        })
        const email = {
            body: {
                name,
                intro: 'Welcome to Hi-Fi! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with Mailgen, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyTokenEmail}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }
      return  mailGenerator.generate(email)
    }
    async sendVerifyEmail(email, name, verifyTokenEmail){
        const emailHTML = this.createTemplateEmail(name,verifyTokenEmail)
        const message = {
            to: email,
            subject:'verify your email',
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