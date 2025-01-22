document.addEventListener('DOMContentLoaded', () => {
    const botonCargarPersonajes = document.getElementById('cargarPersonajes');
    const listaPersonajes = document.getElementById('listaPersonajes');
    const apiUrl = 'https://rickandmortyapi.com/api/character';

    botonCargarPersonajes.addEventListener('click', obtenerPersonajes);

    function obtenerPersonajes() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Limpiar la lista antes de agregar nuevos personajes
                listaPersonajes.innerHTML = '';

                const personajes = data.results;

                personajes.forEach(personaje => {
                    // Crear un nuevo elemento de lista
                    const personajeItem = document.createElement('div');
                    personajeItem.classList.add('personaje-item');
                    personajeItem.innerHTML = `
                        <img src="${personaje.image}" alt="${personaje.name}" width="100" height="100">
                        <div class="informacion">
                            <span><strong>${personaje.name}</strong></span><br>
                            <span>${personaje.status} - ${personaje.species}</span>
                        </div>
                        <br><br>
                        <button class="boton-eliminar">Eliminar</button>
                    `;

                    // Añadir funcionalidad para eliminar el nodo
                    personajeItem.querySelector('.boton-eliminar').addEventListener('click', () => {
                        personajeItem.remove();
                    });

                    // Agregar funcionalidad para cambiar la clase del personaje al hacer clic
                    personajeItem.addEventListener('click', () => {
                        personajeItem.classList.toggle('seleccionado');
                    });

                    // Agregar el elemento a la lista
                    listaPersonajes.appendChild(personajeItem);
                });
            })
            .catch(error => {
                console.error('Error al obtener personajes:', error);
            });
    }
});
