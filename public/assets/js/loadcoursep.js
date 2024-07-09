document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (!courseId) {
        console.error('No se encontró el ID del curso en la URL');
        return;
    }

    const courseContainer = document.getElementsByClassName('course-div')[0];

    const loadCourse = async () => {
        try {
            const response = await fetch(`/api/cursos/${courseId}`);
            const data = await response.json();
            console.log(data); // Verifica la estructura de los datos
            if (response.ok) {
                await showCourse(data);
            } else {
                console.error('Error en la respuesta de la API de cursos:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar el curso:', error);
        }
    }

    const getNumberOfLessons = async (courseId) => {
        try {
            const response = await fetch(`/api/lecciones/curso/${courseId}`);
            const data = await response.json();
            console.log(`Response data for lessons of course ID ${courseId}:`, data); // Debugging
            if (response.ok) {
                return data.length;
            } else {
                console.error('Error en la respuesta de la API de lecciones:', data.message);
                return 0;
            }
        } catch (error) {
            console.error('Error al cargar las lecciones:', error);
            return 0;
        }
    }

    const numeroLecciones = await getNumberOfLessons(courseId);

    const showCourse = async (course) => {
        const isCertificado = course[0].iscertified ? 'Sí' : 'No';
        const sectionCourse = document.createElement('section');
        sectionCourse.className = 'course';
        sectionCourse.innerHTML = `
            <h2 class="course-title">${course[0].nombre}</h2>
            <div>
                <img class="course-img" src=${course[0].imagen} alt="curso">
                <iframe class="course-video-description" width="560" height="315" src=${course[0].video_intro} title="course-description-video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <a href="login.html" class="course-button">Inscribirse</a>
        `;
        const courseData = document.createElement('div');
        courseData.className = 'course-data';
        const sectionDetails = document.createElement('section');
        sectionDetails.className = 'course-details';
        sectionDetails.innerHTML = `
            <h3 class="course-details-title">Detalles del curso</h3>
            <p class="course-details-description">${course[0].descripcion}</p>
            <ul class="course-details-list">
                <li class="course-details-item">
                    <span class="material-symbols-outlined">schedule</span>
                    Duración: 
                    <span class="course-details_duration">${course[0].duration}</span>
                </li>
                <li class="course-details-item">
                    <span class="material-symbols-outlined">assignment</span>
                    Lecciones: <span class="course-details_lessons">${numeroLecciones}</span>
                </li>
                <li class="course-details-item">
                    <span class="material-symbols-outlined">assessment</span>
                    Nivel: <span class="course-details_level">${course[0].nivel}</span>
                </li>
                <li class="course-details-item">
                    <span class="material-symbols-outlined">assessment</span>
                    Certificado: <span class="course-details_isCertified">${isCertificado}</span>
                </li>
            </ul>
        `;
        const sectionLessons = document.createElement('section');
        sectionLessons.className = 'lessons';
        sectionLessons.innerHTML = `
            <h3 class="lessons-title">Lecciones</h3>
            <ul class="lessons-list">
                ${await showLessons(courseId)} <!-- Insertar HTML de lecciones -->
            </ul>
        `;
        courseContainer.appendChild(sectionCourse);
        courseData.appendChild(sectionDetails);
        courseData.appendChild(sectionLessons);
        courseContainer.appendChild(courseData);
    }

    const showLessons = async (courseId) => {
        try {
            const response = await fetch(`/api/lecciones/curso/${courseId}`);
            const data = await response.json();
            console.log(`Response data for lessons of course ID ${courseId}:`, data); // Debugging
            if (response.ok) {
                return data.map((lesson) => {
                    const item = document.createElement('li');
                    item.className = 'lessons-item';
                    item.innerHTML = `<a href="#" class="lessons-link">
                                        <span class="material-symbols-outlined">play_circle</span>
                                        ${lesson.nombre}</a>`;
                    return item.outerHTML; // Convertimos el elemento a HTML
                }).join(''); // Unimos los elementos en una sola cadena
            } else {
                console.error('Error en la respuesta de la API de lecciones:', data.message);
                return '';
            }
        } catch (error) {
            console.error('Error al cargar las lecciones:', error);
            return '';
        }
    }

    loadCourse();
});
