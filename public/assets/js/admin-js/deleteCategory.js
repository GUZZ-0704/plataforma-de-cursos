document.addEventListener('DOMContentLoaded', () => {
    const categoriesTable = document.getElementById('categories-table');
    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`/api/categorias/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log('Categoría eliminada');
                window.location.reload();
            } else {
                console.error('Error en la respuesta de la API de categorías:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar la categoría:', error);
        }
    }

    categoriesTable.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-button')) {
            const id = e.target.getAttribute('data-id');
            if (confirm('¿Estás seguro de eliminar la categoría?')) {
                deleteCategory(id);
            }
        }
    });
});