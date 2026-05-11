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
            tr.innerHTML = `
                <td class="px-lg py-md font-bold text-primary">${bici.numero_unidad}</td>
                <td class="px-lg py-md">${bici.nombre_chofer}</td>
                <td class="px-lg py-md">
                    <span class="bg-on-tertiary-container/10 text-on-tertiary-container px-sm py-1 rounded-full text-[10px] font-black uppercase">
                        ${bici.estado}
                    </span>
                </td>
                <td class="px-lg py-md text-on-surface-variant">${bici.zona_operacion}</td>
                <td class="px-lg py-md text-right">
                    <button class="text-primary hover:text-secondary" onclick="editarBici(${bici.id})">
                        <span class="material-symbols-outlined" data-icon="edit">edit</span>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar los bicitaxis:', error);
    }
}

// Función preparada para cuando quieras hacer la edición
function editarBici(id) {
    console.log("Editando bici con ID:", id);
    // Aquí meteremos la lógica del modal más adelante
}