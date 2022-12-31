# imaginamos-prueba
backend en NestJS (Node) para prueba técnica de imaginamos dockerizada y configurada para despliegue con serverless framework.

# modelo

![Relational Model](/readme-assets/relational-model.jpeg?raw=true "Relational Model")

- se optó por un modelo sencillo que cumpliera las especificaciones de relacionar clientes y técnicos a través de tiquetes, se incluyeron también tablas para los departamentos y municipios para poder especificar de forma exacta la ubicación del sitio donde se realiza el trabajo.

- el modelo podría en dado caso ampliarse añadiendo opciones como por ejemplo:

  - una tabla de tipos de trabajo donde se especifique el tipo de tarea que debe realizar el técnico: instalaciones, mantenimientos, entre otros.

  - un campo tipo punto geográfico para indicar la ubicación exacta del servicio, esto aportaría información estratégica sobre las zonas de la ciudad donde menos se solicita el servicio para orientar el marketing hacia esas poblaciones, entre otros.

  - Una entidad de usuarios para abarcar tanto a los clientes como técnicos e incluir opciones de logueo y proteger las rutas mediante un middleware o preferiblemente implementando guards.



# Base de datos

- como SGBD se configuró PostgreSQL en una instancia gratuita generada con el servicio elephantSQL con el objetivo de tener un acceso rápido al servicio y de poder utilizarlo tanto en local como en la versión dockerizada y la versión serverless con AWS, para la versión dockerizada podría también incluirse el servicio dentro de la imagen, pero sería necesario configurar el archivo .env

# API

- **En la carpeta [readme-assets/postman](/readme-assets/postman) se encuentran las colecciones**

- para este caso el token del ticket corresponde al propio uuid de la columna id ya que sigue el estándar RFC 4122, en el caso hipotetico de que por cuestiones de seguridad no fuera conveniente utilizar el propio id de la tabla sería necesario agregar una nueva columna de token o si se prefiere generar desde el backend se podria utilizar la libreria UUID de npm para generar un UUID v4.

- la asignación de tecnicos se hace de maner aleatoria a nivel de BD para evitar tener que consultar la lista completa de tecnicos y seleccionarlo geenrando un numero psudoaleatorio lo cual puede tormarse pesado en sistemas muy grandes.

- adicional al CRUD basico para los mdoelos se incluyeron los siguienets endpoints:

  - en departamento se agrego un endpoint para consultar los municipios asociados a un departaemnto especifico con base a su id, para efectos de esta prueba, en un sistema real para evitar la tarea de rellenar las tablas de departamentos y municipios se puede buscar una API online que cumpla este proposito o generar un JSON con la informacion oficial del DANE para rellenarlas.

  - en clientes se agrego el endpoint para obtener los tiquetes asociados para mostrarle el historial de servicios al cliente.

  - en tecnicos se agrego el endpoint para obtener los tiquetes asociados para que puedan ver las colicitues atendidas y pendientes.

# NestJS

- la prueba se construyó para trabajar con posgreSQL como SGBD sin embargo la inclusión de variables de conexión a la BD en las variables de entorno permite la conexión a los otros sistemas permitidos

- por defecto el sistema tomará la información del archivo .env, en caso de no encontrarlo tambien buscará los archivos .env.dev y .env.prod

- las solicitudes hechas al crud implementan por defecto una interface en la cual se indica si la solicitud fue exitosa o no, algun mensaje que puede ser por ejemplo el mensaje de error y una data que representa la información retornada por el endpoint en caso de una solicitud exitosa, es importante tener en cuenta esta estructura a la hora de acoplarse con un frontend y se realiza de esta manera para tener a futuro la capacidad de añadir una capa de abstracción extra al proceso de captura de errores, incluyendo errores personalziaods propios de la lógica de negocio de la aplicación

# Docker

- la imágen base "node:16.17.0-bullseye-slim" fue seleccionada debido a que se trata de una versión reciente y estable de Debian 11 en formato slim para reducir el consumo de recursos y con una versión LTS de node.

- se utiliza el usuario node en lugar de root para mantener al mínimo los privilegios como una buena práctica de seguridad.

- el comando "npm ci" asegura una instalación limpia de dependencias.

- el archivo .dockerignore asegura que no se agreguen directorios de librerias como el node_modules, directorios y archivos de control de versiones como .git y .gitignore, archivos de log y archivos con variables de ambiente para prevenir filtración de secretos y credenciales de acceso, para el ejercicio actual y teniendo en cuenta que no se pretende compartir en un hub de imágenes docker ni va a contener información muy sensible, se omite la exclusión de los archivos .env.

- proceso de dockerizado:
  1. los archivos de Dockerfile.dev, .dockerignore y docker-compose.yml ya se encuentran en el repositorio
  2. ejecutar el comando docker-compose up --build en la raiz del proyecto (importante tener el local detenido para evitar conflicto de puertos).


# Serverless

- el despliegue se realiza utilizando las funciones lambda de AWS.
- proceso de despliegue:
  1. copiar el archivo .env en la raiz del proyecto
  2. ejecutar un npm i
  3. ejecutar un serverless deploy (el proceso tarda entre 300 y 400 segundos)
  4. agregar la url provista en la consola como variable "server" en el postman.

- actualmente version final de la API esta desplegada en: [AWS lambda function deployed](https://wjbbdxkg0f.execute-api.us-east-1.amazonaws.com/dev/clients)