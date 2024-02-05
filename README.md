# proyecto-inmobiliaria


https://docs.google.com/presentation/d/1Xi7Ll67RfhtUt14nGJdWJ8I1lBXS20uLgiNysHD9ZO0/edit#slide=id.g18807eeb16c_0_0

Desafío NODE js

API Rest
Repaso del módulo

Configuración inicial
Crear un proyecto con el nombre "proyecto-inmobiliaria", lo cual implica: 
Crear la carpeta con el nombre mencionado.
Dentro de la carpeta crear el archivo index.js.
Ejecutar el comando correspondiente para crear el archivo package.json.
Instalar los siguientes paquetes en el proyecto: express, nodemon, cors, knex, body-parser, cookie-parser, morgan, express-validator, nodemon y pg.
En el package.json generar los scripts necesarios para ejecutar el proyecto. Start.



Base de datos
Preparar la base de datos para el desafío. Analizar los datos de este JSON aquí y tomar una decisión para estructurar las tablas y los datos que va a contener.



Preparando Express
En index.js crear un servidor utilizando "express", que escuche en el puerto 3001 y mediante consola mostrar el puerto.



A escribir endpoints…
Dentro del index.js vamos a crear los siguientes puntos de acceso con sus respectivas funcionalidades (RECOMIENDO UTILIZAR POSTMAN O ALGUNA HERRAMIENTA SIMILAR PARA REALIZAR LAS PRUEBAS):
Method: GET, PA: "/". Debe mostrar en el postman un mensaje que diga "Bienvenidos a INMUEBLES SRL".
Method: GET, PA: "/api/inmuebles". Debe mostrar en el postman todos los inmuebles.
Method: GET, PA: "/api/inmuebles/:id". Debe mostrar en el postman el inmueble con el id indicado.
Method: POST, PA: "/api/inmuebles/nuevo". Debe crear un nuevo inmueble y luego mostrar todos en pantalla.



Seguimos!
Method: PUT, PA: "/api/inmuebles/editar/:id". Debe editar uno o más atributos del inmueble pasado por parámetro, y mostrarlo en pantalla.
Method: DELETE, PA: "/api/inmuebles/eliminar/:id". Debe eliminar el inmueble pasado por parámetro y mostrar la lista resultante en pantalla.
Method: GET, PA: "/api/inmuebles/filtro". Debe mostrarse en postman aquellos inmuebles que respondan a los filtros de: metrosCuadrados y/o precio pasados mediante body.
Method: GET, PA: "/api/inmuebles/info". Debe mostrarse en postman un mensaje que describa la cantidad de inmuebles existentes y fecha y hora en la que se realizó la consulta.



Permisos de usuarios
Crear una nueva tabla Usuario que contenga una columna para los permisos.
Luego, crear el endpoint de registro de usuario.
Por último crear el endpoint de login de usuario.



Middlewares
Crear una función middleware que dependiendo del tipo de usuario que realice la petición, le permita acceder o no al recurso (en este último caso visualizar el siguiente mensaje "Usted no posee permisos para está petición"), teniendo en cuenta lo siguiente: 
Todos los tipos de usuarios deben tener acceso al PA: "/"; 
El tipo de usuario 1 va a tener acceso solamente a los puntos b y c. 
El tipo de usuario 2 va a tener acceso solamente a los puntos d, A, C y D. 
El tipo de usuario 3 va a tener acceso solamente al punto B.



Integración con front - FETCH
En un proyecto de React vamos a crear un componente con un formulario de inicio de sesión.
Deberemos hacer la configuración inicial con FETCH.
Luego vamos a crear un archivo Rule_user donde se van a crear los métodos para consumir nuestra API.
Cuando se envíe el formulario, se deberá hacer un post a nuestro backend con las credenciales de usuario y verificar que esté registrado.
Si el usuario puso bien las credenciales, la aplicación deberá redirigir a un componente Home.



En el componente Home se deberá colocar una especie de menú, en donde cada botón hará una consulta a nuestra API.
Plantear un CRUD a través del Home. En el Create usaremos un post, en el Read usaremos un get, en el Update usaremos un Put y en el Delete usaremos un Delete.
Por último, establecer una nueva página de registro de usuario.


Integración con front - FETCH

¡GRACIAS!
