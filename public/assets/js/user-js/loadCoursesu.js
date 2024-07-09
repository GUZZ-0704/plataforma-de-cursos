document.addEventListener('DOMContentLoaded', async function() {
    const idUser = localStorage.getItem('idUsuario');
    const myCoursesContainer = document.getElementsByClassName('my-courses-items')[0];
    const coursesContainer = document.getElementsByClassName('courses-items')[0];
    let inscribedCoursesIds = [];

    const getCourseById = async (id) => {
        try {
            const response = await fetch(`/api/cursos/${id}`);
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                console.error('Error en la respuesta de la API de cursos:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar los cursos:', error);
        }
    };

    const showCourses = async (courses, inscribedCourses) => {
        const filteredCourses = courses.filter(course => !inscribedCourses.includes(course.id));
        const rows = await Promise.all(filteredCourses.map(async (course) => await courseElement(course)));
        rows.forEach(row => {
            coursesContainer.appendChild(row);
        });
    };

    const courseElement = async (course) => {
        const item = document.createElement('a');
        item.className = 'courses-items-item';
        item.href = `course_u.html?id=${course.id}&inscrito=false`;
        item.innerHTML = `
            <h2 class="courses-items-title">${course.nombre}</h2>
            <img class="courses-items-img" src=${course.imagen} alt="curso">
        `;
        return item;
    };

    const showMyCourses = async (courses) => {
        const rows = await Promise.all(courses.map(async (course) => await myCourseElement(course)));
        rows.forEach(row => {
            myCoursesContainer.appendChild(row);
        });
    };

    const myCourseElement = async (course) => {
        const item = document.createElement('a');
        item.className = 'courses-items-item';
        item.href = `course_u.html?id=${course.id}&inscrito=true`;
        item.innerHTML = `
            <h2 class="courses-items-title">${course.nombre}</h2>
            <img class="courses-items-img" src=${course.imagen} alt="curso">
        `;
        return item;
    };

    const loadMyCourses = async () => {
        try {
            const response = await fetch('/api/usuario_cursos/usuario/' + idUser);
            const data = await response.json();
            if (response.ok) {
                inscribedCoursesIds = data.map(course => course.curso_id);
                const coursesData = await Promise.all(inscribedCoursesIds.map(async (id) => await getCourseById(id)));
                await showMyCourses(coursesData.map(courseArray => courseArray[0]));
            } else {
                console.error('Error en la respuesta de la API de cursos inscritos:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar los cursos inscritos:', error);
        }
    };

    const loadCourses = async () => {
        try {
            const response = await fetch('/api/cursos');
            const data = await response.json();
            if (response.ok) {
                await showCourses(data, inscribedCoursesIds);
            } else {
                console.error('Error en la respuesta de la API de cursos:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar los cursos:', error);
        }
    };

    await loadMyCourses();
    await loadCourses();
});