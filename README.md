# imaginamos-prueba
backend en NestJS (Node) para prueba técnica de imaginamos dockerizada y configurada para despliegue con serverless framework

# modelo


# API
- para este caso el token del ticket corresponde al propio uuid de la columna id ya que sigue el estandar RFC 4122, en el caso hipotetico de que por cuestiones de seguridad no fuera conveniente utilizar el propio id de la tabla seria necesario agregar una nueva columna de token o si se prefiere generar desde el backend se podria utilizar la libreria UUID de npm para generar un UUID v4.

# NestJS
- la prueba se construyó para trabajar con posgreSQL como SGBD sin embargo la inclusión de variables de conexión a la BD en las variables de entorno permite la conexión a los otros sistemas permitidos

- por defecto el sistema tomará la información del archivo .env, en caso de no encontrarlo tambien buscará los archivos .env.dev y .env.prod

- las solicitudes hechas al crud implementan por defecto una interface en la cual se indica si la solicitud fue exitosa o no, algun mensaje que puede ser por ejemplo el mensaje de error y una data que representa la información retornada por el endpoint en caso de una solicitud exitosa, es importante tener en cuenta esta estructura a la hora de acoplarse con un frontend y se realiza de esta manera para tener a futuro la capacidad de añadir una capa de abstracción extra al proceso de captura de errores, incluyendo errores personalziaods propios de la lógica de negocio de la aplicación

# Docker

- la imágen base "node:16.17.0-bullseye-slim" fue seleccionada debido a que se trata de una versión reciente y estable de Debian 11 en formato slim para reducir el consumo de recursos y con una versión LTS de node.

- se utiliza el usuario node en lugar de root para mantener al mínimo los privilegios como una buena práctica de seguridad.

- el comando "npm ci" asegura una instalación limpia de dependencias.

- el archivo .dockerignore asegura que no se agreguen directorios de librerias como el node_modules, directorios y archivos de control de versiones como .git y .gitignore, archivos de log y archivos con variables de ambiente para prevenir filtración de secretos y credenciales de acceso, para el ejercicio actual y teniendo en cuenta que no se pretende compartir en un hub de imágenes docker ni va a contener información muy sensible, se omite la exclusión de los archivos .env.

# Serverless




