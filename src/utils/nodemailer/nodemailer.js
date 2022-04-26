const { createTransport } = require("nodemailer");
const { config } = require("../../config")
const user = config.nodemailer_user;
const pass = config.nodemailer_pw;
const transport = createTransport({
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
            const to = process.argv[4] || user;
            const response = await transport.sendMail({
                from:"E-commerce de Emilano <ecommerceEmiliano@gmail.com>",
                to,
                subject,
                html
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    async sendMailCarrito (data_user, data_carrito) {
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
        const response = await transport.sendMail({
            from:"E-commerce de Emilano <ecommerceEmiliano@gmail.com>",
            to: `${data_user.email}`,
            subject: `Nuevo pedido de ${data_user.name}!`,
            html
        });
        return response;
    } 
}
module.exports = new Nodemailer()