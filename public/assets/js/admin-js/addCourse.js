const urlParams2 = new URLSearchParams(window.location.search);
if (!urlParams2.has('id')) {
    document.addEventListener('DOMContentLoaded', async function () {
        const form = document.getElementById('add-course-form');
        const lessontable = document.getElementById('lessons-table');
        lessontable.style.display = 'none';
        const btnAddLesson = document.getElementById('add-lesson-button');
        btnAddLesson.style.display = 'none';

        if (!form) {
            console.error('Formulario con id "add-course-form" no encontrado.');
            return;
        }


        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const category = document.getElementById('category').value;
            const video = document.getElementById('video').value;
            const image = document.getElementById('image').files[0];
            const level = document.getElementById('level').value;
            const modality = document.getElementById('modality').value;
            const certificate = document.getElementById('certificate').checked;

            const errorMessageName = document.getElementById('course-name-error');
            const errorMessageDescription = document.getElementById('course-description-error');
            const errorVideo = document.getElementById('course-video-error');
            const errorImage = document.getElementById('course-image-error');

            if (errorMessageName) errorMessageName.innerHTML = '';
            if (errorMessageDescription) errorMessageDescription.innerHTML = '';
            if (errorVideo) errorVideo.innerHTML = '';
            if (errorImage) errorImage.innerHTML = '';

            if (name === '') {
                if (errorMessageName) errorMessageName.innerHTML = 'Por favor, ingrese un nombre.';
                return;
            }
            if (description === '') {
                if (errorMessageDescription) errorMessageDescription.innerHTML = 'Por favor, ingrese una descripción.';
                return;
            }
            if (video === '') {
                if (errorVideo) errorVideo.innerHTML = 'Por favor, ingrese un video.';
                return;
            }
            if (!image) {
                if (errorImage) errorImage.innerHTML = 'Por favor, ingrese una imagen.';
                return;
            }

            const validateFileType = (file) => {
                const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
                return allowedExtensions.exec(file.name);
            };

            if (!validateFileType(image)) {
                if (errorImage) errorImage.innerHTML = 'Por favor, ingrese una imagen válida.';
                return;
            }

            const categoriaId = await obtenerIdCategoria(category);
            console.log('Categoria ID:', categoriaId);

            const videoId = getVideoId(video);
            const videoUrl = `https://www.youtube.com/embed/${videoId}`;

            const formData = new FormData();
            formData.append('nombre', name);
            formData.append('descripcion', description);
            formData.append('duration', '3 semanas');
            formData.append('nivel', level);
            formData.append('modalidad', modality);
            formData.append('categoria_id', categoriaId);
            formData.append('image', image);
            formData.append('video_intro', videoUrl);
            formData.append('certificado', certificate);

            console.log('Enviando formulario con datos:', {
                name,
                description,
                category,
                video,
                image,
                level,
                modality,
                certificate,
                categoriaId
            });

            try {
                const response = await fetch('/api/cursos', {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    console.error('Error al agregar curso. Estado:', response.status);
                    const errorData = await response.text();
                    console.error('Detalle del error:', errorData);
                    throw new Error('Error al agregar curso');
                }
                const data = await response.json();
                console.log('Curso agregado con éxito:', data);
                window.location.href = '../admin-view/courses_a.html';
            } catch (error) {
                console.error('Error al agregar curso:', error);
                alert('Ocurrió un error al intentar agregar el curso. Por favor, inténtelo de nuevo más tarde.');
            }
        });

        async function obtenerIdCategoria(nombreCategoria) {
            try {
                const response = await fetch(`/api/categorias/nombre/${nombreCategoria}`);
                if (!response.ok) {
                    console.error('Error al obtener el ID de la categoría. Estado:', response.status);
                    const errorData = await response.text();
                    console.error('Detalle del error:', errorData);
                    throw new Error('Error al obtener el ID de la categoría');
                }
                const data = await response.json();
                return data.body.id;
            } catch (error) {
                console.error('Error al obtener ID de categoría:', error);
                throw error;
            }
        }

        function getVideoId(url) {
            var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            console.log(JSON.stringify(videoid));
            if (videoid != null)
                return videoid[1];
            return null;
        }


    });
}
