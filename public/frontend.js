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
                cargarBicitaxis(); // Recargamos la tabla para que desaparezca
            } else {
                alert('Error al eliminar el bicitaxi');
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
                cargarBicitaxis(); // Destruye la fila temporal y trae los datos frescos
            } else {
                alert('Ocurrió un error en el servidor al registrar la unidad.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    } else {
        alert('Validación fallida: Todos los campos son obligatorios.');
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
            cargarBicitaxis(); // Volvemos a pintar la tabla en "Modo Lectura" con los nuevos datos
        } else {
            alert('Error al intentar guardar los cambios.');
        }
    } catch (error) {
        console.error('Error de red:', error);
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