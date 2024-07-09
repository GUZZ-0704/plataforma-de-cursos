document.addEventListener('DOMContentLoaded', async function() {
    const coursesItemsContainer = document.getElementsByClassName('courses-items');
    const loadCourses = async () => {
        try {
            const response = await fetch('/api/cursos');
            const data = await response.json();
            if (response.ok) {
                await showCourses(data);
            } else {
                console.error('Error en la respuesta de la API de cursos:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar los cursos:', error);
        }
    }

    const showCourses = async (courses) => {
        const rows = await Promise.all(courses.map(async (course) => await courseElement(course)));
        rows.forEach(row => {
            coursesItemsContainer[0].appendChild(row);
        });
    }

    const courseElement = async (course) => {
        const categoryName = await getCategoryName(course.categoria_id);
        console.log(`Categoria ID: ${course.categoria_id}, Nombre: ${categoryName}`); // Debugging
        const item = document.createElement('a');
        item.className = 'courses-items-item';
        item.href = `course.html?id=${course.id}`;
        item.innerHTML = `
            <h2 class="courses-items-title">${course.nombre}</h2>
            <img class="courses-items-img" src=${course.imagen} alt="curso">
        `;
        return item;
    }

    const getCategoryName = async (id) => {
        try {
            const response = await fetch(`/api/categorias/${id}`);
            const data = await response.json();
            console.log(`Response data for category ID ${id}:`, data); // Debugging
            if (response.ok && data.length > 0) {
                return data[0].nombre;
            } else {
                console.error('Error en la respuesta de la API de categorías:', data.message);
                return 'Categoría desconocida';
            }
        } catch (error) {
            console.error('Error al cargar la categoría:', error);
            return 'Categoría desconocida';
        }
    }

    loadCourses();
});