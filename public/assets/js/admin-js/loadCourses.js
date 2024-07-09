document.addEventListener('DOMContentLoaded', async function() {
    const coursesTable = document.getElementById('courses-table');
    const btnAddCourse = document.getElementById('btnAddCourse');

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
        coursesTable.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        `;
        const rows = await Promise.all(courses.map(async (course) => await courseElement(course)));
        rows.forEach(row => {
            coursesTable.appendChild(row);
        });
    }

    const courseElement = async (course) => {
        const categoryName = await getCategoryName(course.categoria_id);
        console.log(`Categoria ID: ${course.categoria_id}, Nombre: ${categoryName}`); // Debugging
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.nombre}</td>
            <td>${categoryName}</td>
            <td>
                <button class="edit-button" data-id="${course.id}">Editar</button>
                <button class="delete-button" data-id="${course.id}">Eliminar</button>
            </td>
        `;
        return row;
    }

    const getCategoryName = async (id) => {
        try {
            const response = await fetch(`/api/categorias/${id}`);
            const data = await response.json();
            console.log(`Response data for category ID ${id}:`, data); // Debugging
            if (response.ok && data.length > 0) {
                return data
            } else {
                console.error('Error en la respuesta de la API de categorías:', data.message);
                return 'Categoría desconocida';
            }
        } catch (error) {
            console.error('Error al obtener la categoría:', error);
            return 'Categoría desconocida'; // Manejo de error con valor predeterminado
        }
    }

    loadCourses();

    btnAddCourse.addEventListener('click', function() {
        window.location.href = 'course_a.html';
    });

    coursesTable.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit-button')) {
            const id = e.target.getAttribute('data-id');
            window.location.href = `course_a.html?id=${id}`;
        }
    });
});
