// Función para obtener obras sociales de una API
async function cargarObrasSociales() {
    try {
        const response = await fetch('https://www.sssalud.gob.ar/?page=listRnosc&tipo=7'); // Coloca la URL de la API de obras sociales de Argentina
        const data = await response.json();
        
        const obraSocialSelect = document.getElementById('obraSocial');
        
        data.forEach(obra => {
            const option = document.createElement('option');
            option.value = obra.id; // Asigna el ID de la obra social como valor
            option.text = obra.nombre; // Asigna el nombre de la obra social
            obraSocialSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las obras sociales:', error);
    }
}

// Llamar la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', cargarObrasSociales);
