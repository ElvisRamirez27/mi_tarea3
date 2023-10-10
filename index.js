document.addEventListener('DOMContentLoaded', function () {
    // Obtener y mostrar lista de contactos al cargar la página
    getContactList();

    // Manejar envío del formulario para agregar nuevos contactos
    document.getElementById('addContactForm').addEventListener('submit', function (e) {
        e.preventDefault();
        addContact();
    });
});

// Función para obtener y mostrar la lista de contactos
function getContactList() {
    fetch('http://www.raydelto.org/agenda.php')
        .then(response => response.json())
        .then(data => {
            // Limpiar la lista actual
            document.getElementById('contactList').innerHTML = '';

            // Mostrar cada contacto en la lista
            data.forEach(contact => {
                const listItem = document.createElement('li');
                listItem.textContent = `${contact.nombre} ${contact.apellido} - Teléfono: ${contact.telefono}`;
                document.getElementById('contactList').appendChild(listItem);
            });
        })
        .catch(error => console.error('Error al obtener la lista de contactos:', error));
}

// Función para agregar un nuevo contacto
function addContact() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    const newContact = { nombre, apellido, telefono };

    fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Contacto agregado exitosamente:', data);
            // Actualizar la lista de contactos después de agregar uno nuevo
            getContactList();
        })
        .catch(error => console.error('Error al agregar el contacto:', error));
}
