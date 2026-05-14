# Sistema de Gestión de Flota - Bicitaxis Aragón

Plataforma integral (Dashboard) para el control, monitoreo y administración logística de bases de bicitaxis en Ciudad Nezahualcóyotl y zona de Aragón. 

Este proyecto fue desarrollado como un Producto Mínimo Viable (MVP) enfocado en la eficiencia operativa, eliminando la latencia en la captura de datos mediante interfaces de edición en línea e infraestructura en contenedores.

## Características Principales

* **Panel de Métricas (Dashboard) Reactivo:** Cálculo dinámico de unidades operativas, unidades en taller, proyección de viajes diarios y estimación de recaudación financiera.
* **Operaciones CRUD en Línea:** Creación, lectura, actualización y eliminación de registros directamente sobre la tabla de datos, sin recargas de página ni saltos de contexto.
* **Motor de Búsqueda Dinámico:** Filtrado en memoria (cliente) para localizar unidades, choferes o zonas operativas de manera instantánea.
* **Sistema de Notificaciones (Toasts):** Alertas visuales no bloqueantes para confirmar el estado de las transacciones (éxito o error) en la base de datos.
* **Módulo Geoespacial:** Visualización de rutas y bases operativas mediante un modal a pantalla completa integrado con Google Maps.
* **Exportación de Datos:** Generación estructurada de reportes en formato CSV directamente desde el cliente.

## Arquitectura y Stack Tecnológico

El sistema sigue un patrón arquitectónico Cliente-Servidor con separación estricta de responsabilidades (Patrón MVC en el backend).

* **Frontend (Cliente):** HTML5 Semántico, Tailwind CSS (CDN) para diseño responsivo, y Vanilla JavaScript (ES6+) para la manipulación del DOM y consumo asíncrono de la API.
* **Backend (API REST):** Node.js y Express.js.
* **Base de Datos:** MySQL 8.0 relacional.
* **Infraestructura y Despliegue:** Docker y Docker Compose para orquestación de contenedores en redes virtuales aisladas.

## Flujo de Datos del Sistema

El procesamiento de la información sigue un ciclo de vida estructurado bajo el modelo Cliente-Servidor, asegurando un acoplamiento débil entre la vista y la lógica de negocio:

    [ Interfaz de Usuario ]  <-- JSON -->  [ API REST (Node.js) ]  <-- SQL -->  [ Base de Datos ]
     (Vanilla JS / DOM)                     (Controlador Express)                (MySQL 8.0)

1. **Interacción del Cliente:** El usuario interactúa con la vista HTML. El archivo `frontend.js` intercepta los eventos y estructura los datos en formato JSON.
2. **Petición HTTP:** Mediante la API asíncrona `fetch`, el cliente envía la carga útil hacia el endpoint correspondiente expuesto por el contenedor del backend.
3. **Procesamiento y Persistencia:** El enrutador de Express recibe la petición y la deriva al controlador. Este ejecuta la consulta en MySQL utilizando sentencias preparadas a través del Pool de Conexiones para evitar inyección SQL.
4. **Respuesta y Reactividad:** La base de datos confirma la transacción, Express devuelve un código de estado HTTP, y el cliente actualiza el DOM de forma reactiva sin recargar la página.

## Decisiones Técnicas de Ingeniería

1. **Uso de Vanilla JavaScript sobre Frameworks JS:** Para este MVP, se optó por Vanilla JS para mantener el peso del cliente al mínimo y demostrar dominio profundo de la API del DOM. Esto elimina la necesidad de procesos de compilación.
2. **Pool de Conexiones en MySQL:** En lugar de abrir y cerrar conexiones individuales, el backend implementa un `Connection Pool` asíncrono. Esto previene cuellos de botella ante accesos concurrentes.
3. **Infraestructura Inmutable con Alpine Linux:** El contenedor del servidor utiliza la imagen `node:18-alpine`. Esto reduce la superficie de ataque para vulnerabilidades y disminuye el peso de la imagen drásticamente.
4. **Principio de Mínimos Privilegios en Docker:** El `Dockerfile` transfiere la propiedad de ejecución al usuario sin privilegios `node`, mitigando riesgos de escalada en caso de vulneración del contenedor.
5. **Aislamiento de Redes (Docker Networks):** La base de datos MySQL no está expuesta públicamente. Se comunica con el servidor Express a través de una red virtual interna (`bicitaxi_network`).

## Estructura del Proyecto

    ├── databases/
    │   └── init.sql                 # Script de inicialización y poblado de la BD
    ├── public/
    │   ├── index.html               # Interfaz gráfica principal
    │   └── frontend.js              # Lógica de cliente, Fetch API y manipulación DOM
    ├── src/
    │   ├── config/
    │   │   └── db.js                # Configuración del Pool de conexiones MySQL
    │   ├── controller/
    │   │   └── bicitaxisController.js # Lógica de negocio y transacciones SQL
    │   └── routes/
    │       └── bicitaxisRoutes.js   # Definición de endpoints de la API REST
    ├── .env                         # Variables de entorno (Excluido en git)
    ├── app.js                       # Punto de entrada del servidor Express
    ├── docker-compose.yml           # Orquestador de servicios (App + BD)
    └── Dockerfile                   # Receta de construcción de Node.js

## Guía de Instalación y Despliegue

### Requisitos Previos
* Docker Engine instalado.
* Docker Compose instalado.
* Git.

### Pasos de Ejecución

1. Clonar el repositorio:

        git clone https://github.com/tu-usuario/Bicitaxi-Flota-Dashboard.git
        cd Bicitaxi-Flota-Dashboard

2. Configurar las variables de entorno (crear archivo `.env`):

        DB_HOST=db
        DB_USER=root
        DB_PASSWORD=tu_contrasena_segura
        DB_NAME=bicitaxis_db

3. Construir y levantar los contenedores:

        docker compose up --build -d

4. Acceder a la aplicación:
   Abrir un navegador web y dirigirse a: `http://localhost:3000`

### Comandos de Mantenimiento

* Detener los servicios: `docker compose stop`
* Destruir los servicios y volúmenes (Resetear BD): `docker compose down -v`
* Ver registros del servidor: `docker logs bicitaxi_backend`

## Endpoints de la API REST

| Método | Endpoint | Descripción | Body (JSON) |
|---|---|---|---|
| `GET`  | `/`      | Retorna el listado completo de unidades. | N/A |
| `POST` | `/`      | Registra una nueva unidad en el sistema. | `numero_unidad`, `nombre_chofer`, `zona_operacion`, `estado` |
| `PUT`  | `/:id`   | Actualiza los datos de una unidad específica. | `nombre_chofer`, `zona_operacion`, `estado` |
| `DELETE`| `/:id`   | Elimina un registro de la base de datos. | N/A |

---
*Desarrollado para la optimización de procesos de transporte y logística urbana.*