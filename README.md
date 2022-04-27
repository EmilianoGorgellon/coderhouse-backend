# E-COMMERCE BACK END
Endpoints del proyecto con URL: https://e-commerce-backend-coder.herokuapp.com
## REGISTER
/api/user  metodo "POST" con los siguientes campos:

```json
{
"email":"correo@corre.com",
"password": "contraseña",
"name": "nombre",
"address": "direccion",
"age": 21,
"phone": "+54913465789",
"photo": "desde file, pasa a formato base 64"
}
```
## LOGIN
tiene que dirigirse al siguiente endpoint /api/auth metodo "POST" con los siguientes campos:
```json
{
"email": "correo@correo.com",
"password": "contraseña"
}
```
## API PRODUCTOS
### Agregar producto
/api/productos metodo "POST" con json:
```json
{
    "nombre": "Producto  ",
    "descripcion": "descripcion del producto",
    "codigo": 108,
    "foto": "url del producto",
    "precio": 950,
    "stock": 10
}
```
### Obtener todos los productos
/api/productos metodo "GET" y devuelve todos los productos

### Obtener producto por ID
/api/productos/:id metodo "GET" y devuelve el producto con el siguiente formato
```json
[
    {
        "_id": "61df673cd8e9ce549adeec17",
        "id": 2,
        "timestamp": "January 13th 2022, 4:52:19 am",
        "nombre": "naruto modo sabio",
        "descripcion": "descripcion de naruto",
        "codigo": 109,
        "foto": "https://cdn2.iconfinder.com/data/icons/dragonball-z-glyph/48/Cartoons__Anime_Dragonball_Artboard_2-128.png",
        "precio": 950,
        "stock": 5,
        "__v": 0
    }
]
```
### Actualizar producto
/api/productos/:id metodo "PUT" con el siguiente formato JSON.
```json
{
    "nombre": "Nuevo nombre",
    "descripcion": "Nueva descripcion",
    "codigo": "codigo del producto",
    "foto": "url del producto",
    "precio": "precio",
    "stock": "stock"
}
```
### Eliminar producto por ID se necesita token en headers
/api/productos/:id metodo "DELETE" con header "Authorization" : "Bearer token"
Si esta autorizado: 
```json
{
    "response": "Producto eliminado con id: 7"
}
```
Si no esta autorizado: 
```json
{
    "response": "No dispones de un token valido"
}

```
## API CARRITO
### Para obtener la lista de todos los productos del carrito:
/api/carrito/:id/productos metodo "GET" y devuelve:
```json
[
    {
        "id": 5,
        "timestamp": "tiempo en el que fue creado",
        "productos": [array de productos],
    }
]
```
### Para crear un carrito:
/api/carrito metodo "POST" y devuelve un ID unico
```json
{
    "response": "id: 7"
}
```
### Para vaciar el carrito y eliminarlo:
/api/carrito/:id metodo "DELETE" y devuelve: 
```json
{
    "acknowledged": true,
    "deletedCount": 1
}
```

### Para agregar algun producto por id al carrito por id:
**/api/carrito/:id_carrito/productos/:id_productos** metodo "POST". 
Ejemplo: https://e-commerce-backend-coder.herokuapp.com/api/carrito/5/productos/2 

### Para eliminar producto por id de un carrito por id: 
**/api/carrito/:id_carrito/productos/:id_productos** metodo "DELETE". 
Si existe: 
```json
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```
Si no existe: 
```json
{
    "response": "Error en eliminar producto por id de carrito"
}
```

### Para enviar email y mensaje de whatsapp al comprar el carrito
/api/carrito/:id/send se requiere token en header "Authorization: Bearer token" y devuelve el id eliminado.
