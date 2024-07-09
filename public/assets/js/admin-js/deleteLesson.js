document.addEventListener('DOMContentLoaded', () => {
    const lessonsTable = document.getElementById('lessons-table');
    const deleteLesson = async (id) => {
        try {
            const response = await fetch(`/api/lecciones/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log('Lección eliminada');
                window.location.reload();
            } else {
                console.error('Error en la respuesta de la API de lecciones:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar la lección:', error);
        }
    }

    lessonsTable.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-button')) {
            const id = e.target.getAttribute('data-id');
            if (confirm('¿Estás seguro de eliminar la lección?')) {
                deleteLesson(id);
            }
        }
    });
});