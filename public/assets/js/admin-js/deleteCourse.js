document.addEventListener('DOMContentLoaded', () => {
    const coursesTable = document.getElementById('courses-table');
    const deleteCourse = async (id) => {
        try {
            const response = await fetch(`/api/cursos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log('Curso eliminado');
                window.location.reload();
            } else {
                console.error('Error en la respuesta de la API de cursos:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar el curso:', error);
        }
    }

    coursesTable.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-button')) {
            const id = e.target.getAttribute('data-id');
            if (confirm('¿Estás seguro de eliminar el curso?')) {
                deleteCourse(id);
            }
        }
    });
});