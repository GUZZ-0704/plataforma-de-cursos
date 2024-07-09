const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('id')) {
    const loadCategory = async () => {
        try {
            const id = urlParams.get('id');
            const response = await fetch(`/api/categorias/${id}`);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                document.getElementById('title').value = data;
            } else {
                console.error('Error en la respuesta de la API de categorías:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar la categoría:', error);
        }
    };

    loadCategory(); // Llamada corregida sin argumento

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('form-category');
        if (!form) {
            console.error('Formulario con id "edit-category-form" no encontrado.');
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

            console.log('Datos enviados:');
            console.log('Nombre:', name);

            try {
                const response = await fetch(`/api/categorias/${urlParams.get('id')}`, {
                    method: 'PUT',
                    body: JSON.stringify(category),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    console.log('Categoría actualizada');
                    window.location.href = 'categories_a.html';
                } else {
                    console.error('Error en la respuesta de la API de categorías:', data.message);
                }
            } catch (error) {
                console.error('Error al cargar la categoría:', error);
            }
        });
    });
}