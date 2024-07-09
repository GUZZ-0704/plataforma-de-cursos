document.addEventListener('DOMContentLoaded', function() {
    const idUser = localStorage.getItem('idUsuario');
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson');
    const courseId = urlParams.get('courseId');
    const inscrito = urlParams.get('inscrito');
    console.log('idUsuario:', idUser);
    console.log('idLeccion:', lessonId);
    console.log('idCurso:', courseId);
    console.log('inscrito:', inscrito);

    const lessonContainer = document.getElementsByClassName('lesson')[0];
    const lessonTitle = document.createElement('h1');

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

    const getProgresoByUsuarioLeccion = async (idusuario, idleccion) => {
        try {
            const response = await fetch(`/api/progresos/usuario-leccion/${idusuario}/${idleccion}`);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                progresoSeen(data[0].id)
            } else {
                console.error('Error en la respuesta de la API de progresos:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar el progreso:', error);
        }
    }

    const progresoSeen = async (idprogreso) => {
        try {
            const response = await fetch(`/api/progresos/${idprogreso}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idusuario: idUser,
                    idleccion: lessonId,
                    completado: true
                })
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log('Progreso actualizado');
            } else {
                console.error('Error en la respuesta de la API de progresos:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar el progreso:', error);
        }
    }

    const loadLesson = async () => {
        try {
            const response = await fetch(`/api/lecciones/${lessonId}`);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                lessonTitle.className = 'lesson-title';
                lessonTitle.textContent = data[0].nombre;
                lessonContainer.appendChild(lessonTitle);
                showLesson(data[0]);
            } else {
                console.error('Error en la respuesta de la API de lecciones:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar la lección:', error);
        }
    }

    const showLesson = (lesson) => {
        const lessonContent = document.createElement('div');
        lessonContent.className = 'materials';
        //lesson.descripcion tiene un texto largo con saltos de línea, quiero que la primer linea sea un elemento <p class"material-title">
        //y las siguientes líneas crees un div class="material-description" con un p por cada línea
        const descriptionLines = lesson.descripcion.split('\n');
        const title = document.createElement('p');
        title.className = 'material-title';
        title.textContent = descriptionLines[0];
        lessonContent.appendChild(title);
        const materialDescription = document.createElement('div');
        materialDescription.className = 'material-description';
        for (let i = 1; i < descriptionLines.length; i++) {
            const description = document.createElement('p');
            description.textContent = descriptionLines[i];
            materialDescription.appendChild(description);
        }
        lessonContainer.appendChild(lessonContent);
        lessonContainer.appendChild(materialDescription);
        //si leccion.imagen no es null, crear un elemento img con la url de la imagen
        if (lesson.imagen) {
            const image = document.createElement('img');
            image.src = lesson.imagen;
            lessonContainer.appendChild(image);
        }
        //si leccion.video no es null, crear un elemento iframe con la url del video
        if (lesson.video) {
            const video = document.createElement('iframe');
            video.width = '560';
            video.height = '315';
            video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            video.allowFullscreen = true;
            video.title = 'YouTube video player';
            video.src = lesson.video;
            lessonContainer.appendChild(video);
        }
    }

    loadLesson();
    if (inscrito == 'true') {
        getProgresoByUsuarioLeccion(idUser, lessonId);
    }
});