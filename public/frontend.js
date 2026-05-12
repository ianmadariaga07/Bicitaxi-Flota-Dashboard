// Variable global para almacenar los datos que llegan del servidor
let bicitaxisActuales = [];

// Se ejecuta en cuanto la página carga
document.addEventListener('DOMContentLoaded', () => {
    cargarBicitaxis();
});

async function cargarBicitaxis() {
    try {
        const respuesta = await fetch('/api/bicitaxis');
        bicitaxisActuales = await respuesta.json(); // Guardamos el estado actual
        
        actualizarPanelMetricas();

        const tbody = document.getElementById('tabla-bicitaxis');
        tbody.innerHTML = '';

        bicitaxisActuales.forEach(bici => {
            const tr = document.createElement('tr');
            // Le asignamos un ID dinámico a cada fila para poder manipularla después
            tr.id = `fila-${bici.id}`; 
            tr.className = 'hover:bg-surface-container-low transition-colors border-b border-outline-variant';
            
            // Llamamos a la función que construye el HTML en modo lectura
            tr.innerHTML = construirFilaLectura(bici);
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para ELIMINAR (DELETE)
async function eliminarBici(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este bicitaxi?')) {
        try {
            const respuesta = await fetch(`/api/bicitaxis/${id}`, {
                method: 'DELETE'
            });
            
            if (respuesta.ok) {
                mostrarNotificacion('Registro eliminado de la base de datos', 'exito');
                cargarBicitaxis(); // Recargamos la tabla para que desaparezca
            } else {
                mostrarNotificacion('Operación cancelada. Error al eliminar el bicitaxi.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Función para activar el modo "Nueva Unidad" inyectando una fila superior
function activarCreacionInline() {
    const tbody = document.getElementById('tabla-bicitaxis');
    
    // Validamos que no exista ya una fila de creación abierta para evitar duplicados
    if (document.getElementById('fila-nueva')) return;

    const tr = document.createElement('tr');
    tr.id = 'fila-nueva';
    tr.className = 'bg-primary-container/10 border-b border-primary/30 transition-colors';

    tr.innerHTML = `
        <td class="px-6 py-5">
            <input type="text" id="nuevo-numero" placeholder="Ej. BC-005" class="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary rounded px-2 py-1 text-sm font-bold text-on-surface outline-none">
        </td>
        <td class="px-6 py-5">
            <input type="text" id="nuevo-chofer" placeholder="Nombre completo" class="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary rounded px-2 py-1 text-sm text-on-surface outline-none">
        </td>
        <td class="px-6 py-5">
            <input type="text" id="nueva-zona" placeholder="Ruta o Base" class="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary rounded px-2 py-1 text-sm text-on-surface outline-none">
        </td>
        <td class="px-6 py-5">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-container/20 text-primary uppercase">
                ACTIVO
            </span>
        </td>
        <td class="px-6 py-5 text-right">
            <div class="flex justify-end gap-3">
                <button class="text-primary hover:text-primary-container transition-colors" onclick="guardarNuevaBici()">
                    <span class="material-symbols-outlined">save</span>
                </button>
                <button class="text-outline hover:text-error transition-colors" onclick="cargarBicitaxis()">
                    <span class="material-symbols-outlined">cancel</span>
                </button>
            </div>
        </td>
    `;

    // prepand() inserta el nodo al principio, a diferencia de appendChild()
    tbody.prepend(tr);
}

// Función que lee la fila temporal y ejecuta el POST
async function guardarNuevaBici() {
    const numero = document.getElementById('nuevo-numero').value.trim();
    const chofer = document.getElementById('nuevo-chofer').value.trim();
    const zona = document.getElementById('nueva-zona').value.trim();

    if (numero && chofer && zona) {
        try {
            const respuesta = await fetch('/api/bicitaxis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    numero_unidad: numero,
                    nombre_chofer: chofer,
                    zona_operacion: zona,
                    estado: 'Activo' // Por regla de negocio, un registro nuevo nace activo
                })
            });

            if (respuesta.ok) {
                mostrarNotificacion('Unidad registrada exitosamente', 'exito');
                cargarBicitaxis(); // Destruye la fila temporal y trae los datos frescos
            } else {
                mostrarNotificacion('Ocurrió un error en el servidor al registrar la unidad.', 'error');
            }
        } catch (error) {
            console.error('Error de red:', error);
            mostrarNotificacion('Error de red al intentar registrar la unidad.', 'error');
        }
    } else {
        mostrarNotificacion('Validación fallida: Todos los campos son obligatorios.', 'error');
    }
}

// EJECUCIÓN: Lee los inputs y envía el PUT a la base de datos
async function guardarEdicionInline(id) {
    const nuevoChofer = document.getElementById(`edit-chofer-${id}`).value;
    const nuevaZona = document.getElementById(`edit-zona-${id}`).value;
    const nuevoEstado = document.getElementById(`edit-estado-${id}`).value;

    try {
        const respuesta = await fetch(`/api/bicitaxis/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre_chofer: nuevoChofer,
                zona_operacion: nuevaZona,
                estado: nuevoEstado
            })
        });

        if (respuesta.ok) {
            mostrarNotificacion('Datos de la unidad actualizados', 'exito');
            cargarBicitaxis(); // Volvemos a pintar la tabla en "Modo Lectura" con los nuevos datos
        } else {
            mostrarNotificacion('Error al intentar guardar los cambios.', 'error');
        }
    } catch (error) {
        console.error('Error de red:', error);
        mostrarNotificacion('Error de red al intentar guardar los cambios.', 'error');
    }
}

// MODO LECTURA: El HTML normal de tu tabla
function construirFilaLectura(bici) {
    return `
        <td class="px-6 py-5 font-body-md text-body-md font-bold">${bici.numero_unidad}</td>
        <td class="px-6 py-5">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                    ${bici.nombre_chofer.charAt(0).toUpperCase()}
                </div>
                <span class="font-body-md text-body-md">${bici.nombre_chofer}</span>
            </div>
        </td>
        <td class="px-6 py-5 font-body-md text-body-md">${bici.zona_operacion}</td>
        <td class="px-6 py-5">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-container/20 text-primary uppercase">
                ${bici.estado}
            </span>
        </td>
        <td class="px-6 py-5 text-right">
            <div class="flex justify-end gap-3">
                <button class="text-outline hover:text-primary transition-colors" onclick="activarEdicionInline(${bici.id})">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="text-error/70 hover:text-error transition-colors" onclick="eliminarBici(${bici.id})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </td>
    `;
}

// MODO EDICIÓN: Reemplaza los textos por inputs interactivos
function activarEdicionInline(id) {
    const fila = document.getElementById(`fila-${id}`);
    const bici = bicitaxisActuales.find(b => b.id === id); // Buscamos los datos de esa bici

    fila.innerHTML = `
        <td class="px-6 py-5 font-body-md font-bold text-outline">${bici.numero_unidad}</td>
        <td class="px-6 py-5">
            <input type="text" id="edit-chofer-${id}" value="${bici.nombre_chofer}" class="w-full bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-sm text-on-surface">
        </td>
        <td class="px-6 py-5">
            <input type="text" id="edit-zona-${id}" value="${bici.zona_operacion}" class="w-full bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-sm text-on-surface">
        </td>
        <td class="px-6 py-5">
            <select id="edit-estado-${id}" class="w-full bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-sm text-on-surface">
                <option value="Activo" ${bici.estado === 'Activo' ? 'selected' : ''}>Activo</option>
                <option value="En Taller" ${bici.estado === 'En Taller' ? 'selected' : ''}>En Taller</option>
                <option value="Inactivo" ${bici.estado === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
            </select>
        </td>
        <td class="px-6 py-5 text-right">
            <div class="flex justify-end gap-3">
                <button class="text-primary hover:text-primary-container transition-colors" onclick="guardarEdicionInline(${id})">
                    <span class="material-symbols-outlined">save</span>
                </button>
                <button class="text-outline hover:text-error transition-colors" onclick="cargarBicitaxis()">
                    <span class="material-symbols-outlined">cancel</span>
                </button>
            </div>
        </td>
    `;
}

// Algoritmo de actualización matemática para los KPIs
function actualizarPanelMetricas() {
    // 1. Configuración de la Fecha Actual del sistema operativo
    const opcionesFecha = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const fechaActual = new Date().toLocaleDateString('es-MX', opcionesFecha);
    document.getElementById('fecha-hoy').textContent = `Hoy: ${fechaActual}`;

    // 2. Cálculo analítico del estado de la flota
    const totalUnidades = bicitaxisActuales.length;
    const unidadesActivas = bicitaxisActuales.filter(bici => bici.estado === 'Activo').length;
    const unidadesTaller = bicitaxisActuales.filter(bici => bici.estado === 'En Taller').length;

    // 3. Simulación de inteligencia de negocio basada en datos reales
    // Se asume un rendimiento de 12 viajes diarios por unidad activa, a $25 MXN el viaje
    const viajesEstimados = unidadesActivas * 12; 
    const recaudacionEstimada = viajesEstimados * 25;

    // 4. Inyección en el Modelo de Objetos del Documento (DOM)
    document.getElementById('kpi-activas').textContent = `${unidadesActivas}/${totalUnidades}`;
    document.getElementById('kpi-taller').textContent = unidadesTaller.toString();
    document.getElementById('kpi-viajes').textContent = viajesEstimados.toString();
    
    // Formateo de moneda estandarizado
    document.getElementById('kpi-recaudacion').textContent = new Intl.NumberFormat('es-MX', { 
        style: 'currency', 
        currency: 'MXN' 
    }).format(recaudacionEstimada);
}

// Algoritmo de exportación de estructura de datos a archivo plano (CSV)
function exportarCSV() {
    if (bicitaxisActuales.length === 0) {
        mostrarNotificacion('No hay registros en la base de datos para exportar.', 'error');
        return;
    }

    // Definición de cabeceras
    let csvContent = "ID,Numero Unidad,Chofer Asignado,Zona Operacion,Estado\n";

    // Iteración de extracción de datos
    bicitaxisActuales.forEach(bici => {
        // Envolvemos los campos en comillas por si contienen comas internamente
        const fila = `"${bici.id}","${bici.numero_unidad}","${bici.nombre_chofer}","${bici.zona_operacion}","${bici.estado}"`;
        csvContent += fila + "\n";
    });

    // Creación dinámica de objeto Blob (Binary Large Object)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Creación y ejecución de un hipervínculo invisible para forzar la descarga
    const enlaceOculto = document.createElement("a");
    enlaceOculto.setAttribute("href", url);
    enlaceOculto.setAttribute("download", `Reporte_Flota_${new Date().getTime()}.csv`);
    document.body.appendChild(enlaceOculto);
    
    enlaceOculto.click();
    document.body.removeChild(enlaceOculto);
}

// Función para filtrar los datos en tiempo real desde la memoria
function filtrarTabla() {
    const textoBuscado = document.getElementById('buscador-bicitaxis').value.toLowerCase();
    const tbody = document.getElementById('tabla-bicitaxis');
    
    // Limpiamos la tabla
    tbody.innerHTML = '';

    // Filtramos el arreglo global verificando coincidencias en los 4 campos
    const bicitaxisFiltrados = bicitaxisActuales.filter(bici => {
        return bici.numero_unidad.toLowerCase().includes(textoBuscado) ||
                bici.nombre_chofer.toLowerCase().includes(textoBuscado) ||
                bici.zona_operacion.toLowerCase().includes(textoBuscado) ||
                bici.estado.toLowerCase().includes(textoBuscado);
    });

    // Renderizamos únicamente los resultados que pasaron el filtro
    bicitaxisFiltrados.forEach(bici => {
        const tr = document.createElement('tr');
        tr.id = `fila-${bici.id}`;
        tr.className = 'hover:bg-surface-container-low transition-colors border-b border-outline-variant';
        tr.innerHTML = construirFilaLectura(bici);
        tbody.appendChild(tr);
    });
}

// Sistema de Notificaciones Elegantes (Toasts)
function mostrarNotificacion(mensaje, tipo = 'exito') {
    // Verificamos si ya existe un contenedor de toasts, si no, lo creamos
    let contenedor = document.getElementById('toast-container');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'toast-container';
        contenedor.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2';
        document.body.appendChild(contenedor);
    }

    // Definimos los colores basados en el tipo de mensaje y la paleta de tu diseño
    const colores = tipo === 'error' 
        ? 'bg-error text-on-error border-error-container' 
        : 'bg-primary text-on-primary border-primary-container';
    
    const icono = tipo === 'error' ? 'error' : 'check_circle';

    // Creamos la alerta
    const alerta = document.createElement('div');
    alerta.className = `flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${colores} transform transition-all duration-300 translate-y-10 opacity-0`;
    alerta.innerHTML = `
        <span class="material-symbols-outlined">${icono}</span>
        <p class="font-body-md text-sm font-medium">${mensaje}</p>
    `;

    contenedor.appendChild(alerta);

    // Animación de entrada
    requestAnimationFrame(() => {
        alerta.classList.remove('translate-y-10', 'opacity-0');
    });

    // Desaparecer automáticamente después de 3 segundos
    setTimeout(() => {
        alerta.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => alerta.remove(), 300); // Esperamos a que termine la animación para borrar el nodo
    }, 3000);
}

// Función para expandir el mapa en un Modal
function expandirMapa() {
    // Validamos que no exista ya un modal abierto
    if (document.getElementById('modal-mapa')) return;

    const modal = document.createElement('div');
    modal.id = 'modal-mapa';
    // Clases de Tailwind para pantalla completa, fondo oscuro y centrado
    modal.className = 'fixed inset-0 z-[100] bg-on-background/80 flex items-center justify-center p-4 md:p-8 opacity-0 transition-opacity duration-300';
    
    // Construcción de la ventana interior
    modal.innerHTML = `
        <div class="relative w-full h-full max-w-6xl bg-surface rounded-xl overflow-hidden shadow-2xl flex flex-col transform scale-95 transition-transform duration-300" id="modal-mapa-contenido">
            
            <div class="flex justify-between items-center p-4 bg-surface-container border-b border-outline-variant">
                <h3 class="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">map</span>
                    Mapa Operativo - Nezahualcóyotl
                </h3>
                <button onclick="cerrarMapa()" class="text-outline hover:text-error transition-colors p-2 rounded-full hover:bg-surface-variant flex items-center justify-center">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            
            <div class="flex-1 w-full bg-surface-container-lowest">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120415.71962386372!2d-99.07663249052565!3d19.414441584856983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e2e380f3b581%3A0x600236aeb956690!2sCiudad%20Nezahualc%C3%B3yotl%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1715480000000!5m2!1ses-419!2smx" 
                    class="w-full h-full" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Animación de entrada fluida (opacidad y escala)
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('modal-mapa-contenido').classList.remove('scale-95');
    });
}

// Función para destruir el Modal
function cerrarMapa() {
    const modal = document.getElementById('modal-mapa');
    if (modal) {
        // Animación de salida
        modal.classList.add('opacity-0');
        document.getElementById('modal-mapa-contenido').classList.add('scale-95');
        
        // Esperamos a que termine la animación (300ms) para borrar el código HTML
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}