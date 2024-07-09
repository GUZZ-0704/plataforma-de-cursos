//url params

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('id')) {
    document.addEventListener('DOMContentLoaded', () => {

        const idLesson = urlParams.get('id');
        const idCourse = urlParams.get('course');

        const form = document.getElementById('add-lesson-form');

        const checkVideo = document.getElementById('check-video');
        const checkImage = document.getElementById('check-image');

        if (checkVideo) {
            checkVideo.addEventListener('change', () => {
                const videoInput = document.getElementById('video');
                if (checkVideo.checked) {
                    videoInput.disabled = false;
                } else {
                    videoInput.disabled = true;
                }
            });
        }

        if (checkImage) {
            checkImage.addEventListener('change', () => {
                const imageInput = document.getElementById('image');
                if (checkImage.checked) {
                    imageInput.disabled = false;
                } else {
                    imageInput.disabled = true;
                }
            });
        }


        const loadLesson = async (id) => {
            try {
                const response = await fetch(`/api/lecciones/${id}`);
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    console.log('Lección cargada');
                    fillForm(data[0]);
                } else {
                    console.error('Error en la respuesta de la API de lecciones:', data.message);
                }
            } catch (error) {
                console.error('Error al cargar la lección:', error);
            }
        }

        const fillForm = async (lesson) => {
            const titleInput = document.getElementById('title');
            const descriptionInput = document.getElementById('description');
            const checkVideo = document.getElementById('check-video');
            const videoInput = document.getElementById('video');
            const checkImage = document.getElementById('check-image');
            const imageInput = document.getElementById('image');
            const ordenInput = document.getElementById('orden');

            titleInput.value = lesson.nombre;
            descriptionInput.value = lesson.descripcion;
            if (lesson.video) {
                checkVideo.checked = true;
            }
            if (lesson.imagen) {
                checkImage.checked = true;
            }
            videoInput.value = lesson.video;
            imageInput.value = lesson.imagen;
            ordenInput.value = lesson.orden;

        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const video = document.getElementById('video').value;
            const image = document.getElementById('image').value;
            const orden = document.getElementById('orden').value;

            const lesson = {
                nombre: title,
                descripcion: description,
                video: video,
                idcurso: idCourse,
                imagen: image,
                orden: orden
            }

            console.log('Lección:', lesson);

            try {
                const response = await fetch(`/api/lecciones/${idLesson}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(lesson)
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    alert('Lección actualizada correctamente');
                    window.location.href = 'course_a.html?id=' + idCourse;
                } else {
                    alert('Error al actualizar la lección');
                }
            } catch (error) {
                console.error('Error al actualizar la lección:', error);
            }
        });

        if (urlParams.has('id')) {
            const idLesson = urlParams.get('id');
            console.log('id:', idLesson);
            loadLesson(idLesson);
        }
    });
}