document.addEventListener('DOMContentLoaded', async function() {
    const idUser = localStorage.getItem('idUsuario');
    const courseContainer = document.getElementsByClassName('course-div')[0];
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    const inscrito = urlParams.get('inscrito');
    console.log('Inscrito:', inscrito);
    console.log('ID del curso:', courseId);
    console.log('ID del usuario:', idUser);


    if (!courseId) {
        console.error('No se encontró el ID del curso en la URL');
        return;
    }
    
    window.addEventListener('popstate', function(event) {
        // Recargar la página al detectar un cambio en el historial (como presionar la flecha de atrás)
        window.location.reload();
    });

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // La página se está cargando desde la caché, probablemente como resultado de presionar la flecha de atrás.
            // Forzar recarga de la página para asegurar que los datos se actualicen.
            window.location.reload();
        }
    });

    console.log('ID del usuario antes de enrollCourse:', idUser); // Log 1
    console.log('ID del curso antes de enrollCourse:', courseId); // Log 2

    const enrollCourse = async (idUser, courseId) => {
        console.log('ID del usuario dentro de enrollCourse:', idUser); // Log 3
        console.log('ID del curso dentro de enrollCourse:', courseId); // Log 4

        const usuarioIdNumerico = parseInt(idUser);
        const courseIdNumerico = parseInt(courseId);

        const requestBody = JSON.stringify({
            idusuario: usuarioIdNumerico,
            idcurso: courseIdNumerico,
            progreso: 0
        });

        console.log('Cuerpo de la solicitud:', requestBody); // Log 5

        try {
            const response = await fetch('/api/usuario_cursos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });
            const data = await response.json();
            console.log('Response data after inscribing to course:', data); // Log 6
            if (response.ok) {
                window.location.href = `course_u.html?id=${courseId}&inscrito=true`;
            } else {
                console.error('Error en la respuesta de la API de inscripción:', data.message);
            }
        } catch (error) {
            console.error('Error al inscribirse al curso:', error);
        }
    }

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
        `;
        const btnInscribirse = document.createElement('a');
        btnInscribirse.href = `#`;
        btnInscribirse.className = 'course-button';
        btnInscribirse.innerHTML = 'Inscribirse';
        console.log('Inscrito:', inscrito);
        if (inscrito === 'false') {
            console.log('Inscribirse:', btnInscribirse);
            sectionCourse.appendChild(btnInscribirse);
        }
        btnInscribirse.addEventListener('click', async (event) => {
            event.preventDefault();
            await enrollCourse(idUser, courseId);
        });
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

        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-div';
        if(inscrito === 'true') {
            const spanProgress = document.createElement('span');
            spanProgress.innerHTML = 'Progreso:';
            const spanPercentage = document.createElement('span');
            spanPercentage.className = 'coures-percentage';
            const progreso = await getCourseProgress(courseId, idUser);
            spanPercentage.innerHTML = progreso + '%';
            const progress = document.createElement('progress');
            progress.className = 'courses-items-progress';
            progress.value = progreso;
            progress.max = 100;
            spanProgress.appendChild(spanPercentage);
            progressContainer.appendChild(spanProgress);
            progressContainer.appendChild(progress);
        }
        courseContainer.appendChild(sectionCourse);
        courseData.appendChild(progressContainer);
        courseData.appendChild(sectionDetails);
        courseData.appendChild(sectionLessons);
        courseContainer.appendChild(courseData);
    }

    const showLessons = async (lessons) => {
        try {
            const response = await fetch(`/api/lecciones/curso/${courseId}`);
            const data = await response.json();
            console.log(`Response data for lessons of course ID ${courseId}:`, data); // Debugging
            if (response.ok) {
                return data.map((lesson) => {
                    const item = document.createElement('li');
                    item.className = 'lessons-item';
                    const a = document.createElement('a');
                    a.href = `lessons_u.html?lesson=${lesson.id}&inscrito=${inscrito}&courseId=${courseId}`;
                    a.className = 'lessons-link';
                    a.innerHTML = `
                        <span class="material-symbols-outlined">play_circle</span>
                        ${lesson.nombre}
                    `;
                    item.appendChild(a);
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

    const getCourseProgress = async (courseId, userId) => {
        try {
            const response = await fetch(`/api/usuario_cursos/usuario/${userId}/curso/${courseId}`);
            const data = await response.json();
            console.log(`Response data for course progress of user ID ${userId} and course ID ${courseId}:`, data); // Debugging
            if (response.ok) {
                return data[0].progreso;
            } else {
                console.error('Error en la respuesta de la API de progreso de curso:', data.message);
                return 0;
            }
        } catch (error) {
            console.error('Error al cargar el progreso del curso:', error);
            return 0;
        }
    }
    await loadCourse();

});