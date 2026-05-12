// Se ejecuta en cuanto la página carga
document.addEventListener('DOMContentLoaded', () => {
    cargarBicitaxis();
});

async function cargarBicitaxis() {
    try {
        // Le pedimos los datos a la ruta de tu servidor Express
        const respuesta = await fetch('/api/bicitaxis');
        const bicitaxis = await respuesta.json();

        const tbody = document.getElementById('tabla-bicitaxis');
        tbody.innerHTML = ''; // Limpiamos por si acaso

        // Iteramos sobre los datos que mandó la base de datos
        bicitaxis.forEach(bici => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-surface-container-low transition-colors border-b border-outline-variant';
            
            // Creamos las columnas usando la sintaxis de Tailwind que traía tu HTML
            // Generación dinámica de las columnas con la estructura visual corregida
            tr.innerHTML = `
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
                        <button class="text-outline hover:text-primary transition-colors" onclick="editarBici(${bici.id})">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="text-error/70 hover:text-error transition-colors" onclick="eliminarBici(${bici.id})">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar los bicitaxis:', error);
    }
}

// Función para ACTUALIZAR (PUT)
async function editarBici(id) {
    const chofer = prompt('Ingresa el nombre actualizado del chofer:');
    const zona = prompt('Ingresa la zona de operación actualizada:');
    const estado = prompt('Ingresa el estado actualizado (Activo, En Taller, Inactivo):');
    
    // Verificamos que el usuario no haya dejado campos en blanco
    if (chofer && zona && estado) {
        try {
            const respuesta = await fetch(`/api/bicitaxis/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre_chofer: chofer,
                    zona_operacion: zona,
                    estado: estado
                })
            });

            if (respuesta.ok) {
                // Se recarga la vista para reflejar el cambio en la base de datos
                cargarBicitaxis(); 
            } else {
                alert('Error en el servidor al intentar actualizar el registro.');
            }
        } catch (error) {
            console.error('Error de red o conexión:', error);
        }
    } else {
        alert('Operación cancelada. Es obligatorio llenar todos los campos.');
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

// Función para AGREGAR (POST)
async function agregarBiciRapido() {
    const numero = prompt('Ingresa el número de unidad (ej. BC-004):');
    const chofer = prompt('Ingresa el nombre del chofer:');
    const zona = prompt('Ingresa la zona de operación:');
    
    if (numero && chofer && zona) {
        try {
            const respuesta = await fetch('/api/bicitaxis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    numero_unidad: numero,
                    nombre_chofer: chofer,
                    zona_operacion: zona,
                    estado: 'Activo'
                })
            });

            if (respuesta.ok) {
                cargarBicitaxis(); // Recargamos la tabla para ver el nuevo registro
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}