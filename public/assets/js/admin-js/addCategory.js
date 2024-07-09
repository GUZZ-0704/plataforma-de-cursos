const urlParams2 = new URLSearchParams(window.location.search);

if (!urlParams2.has('id')) {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('form-category');
        if (!form) {
            console.error('Formulario con id "add-lesson-form" no encontrado.');
            return;
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('title').value;

            const errorMessageName = document.getElementById('category-name-error');

            if (errorMessageName) errorMessageName.innerHTML = '';

            if (name === '') {
                if (errorMessageName) errorMessageName.innerHTML = 'Por favor, ingrese un nombre.';
                return;
            }

            const category = {
                nombre: name
            };
            // Datos enviados en el form
            console.log('Datos enviados:');
            console.log('Nombre:', name);

            // Enviar datos al servidor
            try {
                const response = await fetch('/api/categorias', {
                    method: 'POST',
                    body: JSON.stringify(category),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    console.log('Category creada');
                    window.location.href = `categories_a.html`;
                } else {
                    console.error('Error en la respuesta de la API de lecciones:', data.message);
                }
            } catch (error) {
                console.error('Error al cargar la lección:', error);
            }
        });
    });
}