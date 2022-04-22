const { createTransport } = require("nodemailer");
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
class Nodemailer {
    async sendMail(data) {
        try {
            console.log("ENTRO EN TRY Y VOY A ENVIAR EL CORREO");
            console.log(data);
            const subject = "Nuevo registro!";
            const html = 
                `
                    <h1>Informacion del usuario registrado</h1>
                    <ul>
                        <li>Nombre: ${data.name}</li>
                        <li>Email: ${data.email}</li>
                        <li>Edad: ${data.edad}</li>
                        <li>Telefono: ${data.phone}</li>
                        <img src="data:image/png;base64,${data.photo}" alt="perfil-img-user" />
                    </ul>
                `; 
                // <img style="width: 300px; object-fit: contain;" src="data:image/png;base64,${data.photo}" alt="perfil-img-user" />
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
    }

    async sendMailCarrito (data_user, data_carrito) {
        const subject = `Nuevo pedido de ${data_user.name}!`;
        const html = 
            `
                <h1>Informacion del pedido: </h1>
                ${data_carrito.map(data_product => 
                    `
                        <ul>
                            <li>Nombre: ${data_product.nombre}</li>
                            <li>Descripcion: ${data_product.descripcion}</li>
                            <li>Precio: ${data_product.precio}</li>
                            <img src="${data_product.foto}" alt="foto-product-${data_product.name}" />
                        </ul>
                    `)}
            `     
            // <img style="width: 300px; object-fit: contain;" src="data:image/png;base64,${data.photo}" alt="perfil-img-user" />
        const to =`${data_user.email}`;
        // const attach = process.argv[5] ? true : false;
        const response = await transport.sendMail({
            from:"E-commerce de Emilano <ecommerceEmiliano@gmail.com>",
            to,
            subject,
            html
            // attachments: attach ? [{ path: `${data.photo}` }] : []
        });
        return response;
    } 
}
// console.log("PASO POR ARCHIVO NODEMAILER.JS");

// const sendEmail = async (data) => {
   
// };
module.exports = new Nodemailer()