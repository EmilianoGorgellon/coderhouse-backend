const { createTransport } = require("nodemailer");
console.log("PASO POR ARCHIVO NODEMAILER.JS");
const user = "emilianogorgellon49@gmail.com";
const pass = "usllihgydqtvnjhb";
const transport = createTransport({
    // host: "smtp.ethereal.email"
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user,
        pass
    }
});
const sendEmail = async (data) => {
    try {
        console.log("ENTRO EN TRY Y VOY A ENVIAR EL CORREO");
        const subject = process.argv[2] || "Nuevo registro!";
        const html = process.argv[3] || 
            `
                <h1>Informacion del usuario registrado</h1>
                <ul>
                    <li>Nombre: ${data.name}</li>
                    <li>Email: ${data.email}</li>
                    <li>Edad: ${data.edad}</li>
                    <li>Telefono: ${data.phone}</li>
                </ul>
                <img style="width: 300px; object-fit: contain;" src="data:image/png;base64,${data.photo}" alt="perfil-img-user" />
            `; 
        const to = process.argv[4] || user;
        const attach = process.argv[5] ? true : false;
        const response = await transport.sendMail({
            from:"E-commerce de Emilano <ecommerceEmiliano@gmail.com>",
            to,
            subject,
            html
            // attachments: attach ? [{ path: `${data.photo}` }] : []
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
module.exports = {sendEmail}