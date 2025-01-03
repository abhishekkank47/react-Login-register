import { mailtrapClient, sender } from "./emailConfig.js"
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTempelate.js"


//VERIFY EMAIL
export const sendVerificationEmail = async(email, verificationToken)=>{
    const recipent = [{email}]

    try {
        const response = await mailtrapClient.send(
            {
                from:sender,
                to:recipent,
                subject:"Verify your Email",
                html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
                category: "Email Verification"
            }
        )
        console.log('EMAIL SEND SUCCESSFULLY', response)
    } catch (error) {
        console.log(error)
        throw new Error(`Error sending Email: ${error}`)
    }
}

//WELCOME EMAIL
export const sendWelcomeEmail = async(email,name)=>{
    try {
        const recipent = [{email}]
        const response = await mailtrapClient.send(
            {
                from : sender,
                to : recipent,
                template_uuid : "657fb2c3-1244-493a-8850-73733d772893",

                template_variables : {
                    "company_name": "Rajyug IT Solutions"
                }
            }
        )
    
    } catch (error) {
        console.log('ERROR IN SENDING WELCOME MAIL : ',error);
    }
}

//RESET PASSWORD EMAIL
export const sendResetPasswordEmail = async(email,resetURL)=>{
    try {
        const recipent =[{email}]

        const response = await mailtrapClient.send(
            {
                from:sender,
                to:recipent,
                subject:"Reset your Password",
                html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
                category: "Password Reset"
            }
        )

    } catch (error) {
        console.log(`ERROR IN SENDING RESET PASSWORD EMAIL`,error)
    }
}

//SUCCESS RESET PASSWORD EMAIL
export const sendSuccessPasswordEmail = async(email)=>{
    try {
        const recipent =[{email}]

        const response = await mailtrapClient.send(
            {
                from:sender,
                to:recipent,
                subject:"Password Reset And Saved Successfully",
                html: PASSWORD_RESET_SUCCESS_TEMPLATE,
                category: "Password Reset"
            }
        )
    } catch (error) {
        console.log(`ERROR IN SENDING SUCCESS RESET PASSWORD EMAIL`,error)
    }
}