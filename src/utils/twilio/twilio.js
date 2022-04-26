const { config } = require("../../config");
const { twilio_account_id, twilio_token, twilio_phone_number } = config;

const twilioClient = require("twilio")(twilio_account_id, twilio_token, {
    lazyLoading: true
});

const send_whatsapp_twilio = async (data_user) => {
    try {
        return await twilioClient.messages.create({
            from: `whatsapp:${twilio_phone_number}`,
            to: `whatsapp:${data_user.phone}`,
            body: `Nuevo pedido de ${data_user.name}`,         
        })
    } catch (error) {
        console.log(error, "Error en enviar mensaje");
    }
}; 

module.exports = {send_whatsapp_twilio}