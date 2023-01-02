# imaginamos-prueba
Backend en NestJS (Node) para prueba técnica de imaginamos dockerizada y configurada para despliegue con serverless framework.

<div align="center">
  <img src="https://www.imaginamos.com/wp-content/uploads/2021/04/Brand-300x77.png">
</div><br><br>

<div align="center">
  <img width="10.666%" src="https://seeklogo.com/images/N/nestjs-logo-09342F76C0-seeklogo.com.png">
  <img width="10.666%" src="https://static-00.iconduck.com/assets.00/postman-icon-497x512-beb7sy75.png">
  <img width="16.666%" src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png.webp">
  <img width="18.666%" src="https://files.readme.io/ffb4c59-Serverless.png">
  <img width="18.666%" src="https://miro.medium.com/max/828/0*w8gdoOuEickHYsZk.webp">
  <img width="10.666%" src="https://miro.medium.com/max/600/1*veOyRtKTPeoqC_VlWNUc5Q.webp">
</div>

# modelo

![Relational Model](/readme-assets/relational-model.jpeg?raw=true "Relational Model")

- Se optó por un modelo sencillo que cumpliera las especificaciones de relacionar clientes y técnicos a través de tiquetes, se incluyeron también tablas para los departamentos y municipios para poder especificar de forma exacta la ubicación del sitio donde se realiza el trabajo.

- El modelo podría en dado caso ampliarse añadiendo opciones como, por ejemplo:

  - Una tabla de tipos de trabajo donde se especifique el tipo de tarea que debe realizar el técnico: instalaciones, mantenimientos, entre otros.

  - Un campo tipo punto geográfico para indicar la ubicación exacta del servicio, esto aportaría información estratégica sobre las zonas de la ciudad donde menos se solicita el servicio para orientar el marketing hacia esas poblaciones, entre otros.

  - Una entidad de usuarios para abarcar tanto a los clientes como técnicos e incluir opciones de logueo y proteger las rutas mediante un middleware o preferiblemente implementando guards.


# Base de datos

- Como SGBD se configuró PostgreSQL en una instancia gratuita generada con el servicio elephantSQL con el objetivo de tener un acceso rápido al servicio y de poder utilizarlo tanto en local como en la versión dockerizada y la versión serverless con AWS, para la versión dockerizada podría también incluirse el servicio dentro de la imagen, pero sería necesario configurar el archivo .env.

# API

- **En la carpeta [readme-assets/postman](/readme-assets/postman/) se encuentran las colecciones de Postman, importante configurar la variable server segun se necesite, por defecto para ejecutar en local y docker se utiliza localhost:3001/, en serverless offline se utiliza localhost:3000/dev/**

- **Si desea dar un vistazo rápido al API mediante postman online puede usar este link: [Postman online](https://www.postman.com/webdevelopment3/workspace/imaginamos/overview) sin embargo, si desea utilizarlas se recomienda descargar las colecciones en Postman Desktop**

- **La documentación de Swagger está disponible en: http://localhost:3001/api#/**

- Para este caso el token del ticket corresponde al propio uuid de la columna id ya que sigue el estándar RFC 4122, en el caso hipotético de que por cuestiones de seguridad no fuera conveniente utilizar el propio id de la tabla sería necesario agregar una nueva columna de token o si se prefiere generar desde el backend se podría utilizar la librería UUID de npm para generar un UUID v4.

- La asignación de técnicos se hace de manera aleatoria a nivel de BD para evitar tener que consultar la lista completa de técnicos y seleccionarlo generando un numero pseudoaleatorio lo cual puede tornarse pesado en sistemas muy grandes.

- Adicional al CRUD básico para los modelos se incluyeron los siguientes endpoints:

  - En departamento se agregó un endpoint para consultar los municipios asociados a un departamento especifico con base a su id, para efectos de esta prueba, en un sistema real para evitar la tarea de rellenar las tablas de departamentos y municipios se puede buscar una API online que cumpla este propósito o generar un JSON con la información oficial del DANE para rellenarlas.

  - En clientes se agregó el endpoint para obtener los tiquetes asociados para mostrarle el historial de servicios al cliente.

  - En técnicos se agregó el endpoint para obtener los tiquetes asociados para que puedan ver las solicitudes atendidas y pendientes.

# Testing

- Las pruebas unitarias se realizan con jest y las e2e con supertest.

- **Debido a que en su mayoría es un CRUD básico se realiza el testing del servicio y controlador ticket como modelo de lo que podría realizarse con los otros.**

- **Para ejecutar las pruebas unitarias utilizar el comando:**
```bash
$ npm run test
```

- **Para ejecutar las pruebas e2e utilizar el comando:**
```bash
$ npm run test:e2e
```

# NestJS

- La prueba se construyó para trabajar con postgreSQL como SGBD sin embargo la inclusión de variables de conexión a la BD en las variables de entorno permite la conexión a los otros sistemas permitidos.

- Por defecto el sistema tomará la información del archivo .env, en caso de no encontrarlo también buscará los archivos .env.dev y .env.prod

- Las solicitudes hechas al CRUD implementan por defecto una interface en la cual se indica si la solicitud fue exitosa o no, algún mensaje que puede ser por ejemplo el mensaje de error y una data que representa la información retornada por el endpoint en caso de una solicitud exitosa, es importante tener en cuenta esta estructura a la hora de acoplarse con un frontend y se realiza de esta manera para tener a futuro la capacidad de añadir una capa de abstracción extra al proceso de captura de errores, incluyendo errores personalizados propios de la lógica de negocio de la aplicación.

# Docker

- La imagen base "node:16.17.0-bullseye-slim" fue seleccionada debido a que se trata de una versión reciente y estable de Debian 11 en formato slim para reducir el consumo de recursos y con una versión LTS de node.

- Se utiliza el usuario node en lugar de root para mantener al mínimo los privilegios como una buena práctica de seguridad.

- El comando "npm ci" asegura una instalación limpia de dependencias.

- El archivo .dockerignore asegura que no se agreguen directorios de librerías como el node_modules, directorios y archivos de control de versiones como .git y .gitignore, archivos de log y archivos con variables de ambiente para prevenir filtración de secretos y credenciales de acceso, para el ejercicio actual y teniendo en cuenta que no se pretende compartir en un hub de imágenes docker ni va a contener información muy sensible, se omite la exclusión de los archivos .env.

- proceso de dockerizado:
  1. Los archivos de Dockerfile.dev, .dockerignore y docker-compose.yml ya se encuentran en el repositorio.
  2. Ejecutar el siguiente comando en la raiz del proyecto (importante tener el local detenido para evitar conflicto de puertos).
  ```bash
  $ docker-compose up --build
  ```

# Serverless

- El despliegue se realiza utilizando las funciones lambda de AWS.

- Proceso de despliegue:
  1. Copiar el archivo .env en la raíz del proyecto.
  2. Ejecutar un npm i.
  3. Ejecutar un serverless deploy (el proceso tarda entre 300 y 400 segundos).
  4. Agregar la url provista en la consola como variable "server" en el postman.

- **actualmente la versión final de la API esta desplegada en: [AWS lambda function deployed](https://wjbbdxkg0f.execute-api.us-east-1.amazonaws.com/dev/clients).**

