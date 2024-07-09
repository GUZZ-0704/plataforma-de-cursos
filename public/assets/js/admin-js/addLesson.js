const urlParams2 = new URLSearchParams(window.location.search);

if (!urlParams2.has('id')) {
    document.addEventListener('DOMContentLoaded', () => {
        const idcurso = urlParams2.get('course');
        const form = document.getElementById('add-lesson-form');
        if (!form) {
            console.error('Formulario con id "add-lesson-form" no encontrado.');
            return;
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const orden = document.getElementById('orden').value;

            const errorMessageName = document.getElementById('lesson-name-error');
            const errorMessageDescription = document.getElementById('lesson-description-error');

            if (errorMessageName) errorMessageName.innerHTML = '';
            if (errorMessageDescription) errorMessageDescription.innerHTML = '';

            if (name === '') {
                if (errorMessageName) errorMessageName.innerHTML = 'Por favor, ingrese un nombre.';
                return;
            }
            if (description === '') {
                if (errorMessageDescription) errorMessageDescription.innerHTML = 'Por favor, ingrese una descripción.';
                return;
            }

            const lesson = {
                nombre: name,
                descripcion: description,
                idcurso: idcurso,
                orden: orden
            };
            // Datos enviados en el form
            console.log('Datos enviados:');
            console.log('Nombre:', name);
            console.log('Descripción:', description);
            console.log('Curso:', idcurso);
            console.log('Orden:', orden);

            // Enviar datos al servidor
            try {
                const response = await fetch('/api/lecciones/noimagennovideo', {
                    method: 'POST',
                    body: JSON.stringify(lesson),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    console.log('Lección creada');
                    window.location.href = `course_a.html?id=${idcurso}`;
                } else {
                    console.error('Error en la respuesta de la API de lecciones:', data.message);
                }
            } catch (error) {
                console.error('Error al crear la lección:', error);
            }
        });
    });
}
