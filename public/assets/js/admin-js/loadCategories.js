document.addEventListener('DOMContentLoaded', () => {
    const categoriesTable = document.getElementById('categories-table');
    const btnAddCategory = document.getElementById('btnAddCategory');
    const loadCategories = async () => {
        try {
            const response = await fetch('/api/categorias');
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                const categories = data;
                categories.forEach(category => {
                    categoriesTable.innerHTML += `
                        <tr>
                            <td>${category.nombre}</td>
                            <td>
                                <a href="category_a.html?id=${category.id}" class="edit-button">Editar</a>
                                <button class="delete-button" data-id="${category.id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
            } else {
                console.error('Error en la respuesta de la API de categorías:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar las categorías:', error);
        }
    }

    btnAddCategory.addEventListener('click', () => {
        window.location.href = 'category_a.html';
    });


    loadCategories();
});