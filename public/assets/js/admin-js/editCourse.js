const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('id')) {
    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const form = document.getElementById('add-course-form');
        const lessontable = document.getElementById('lessons-table');
        const btnAddLesson = document.getElementById('add-lesson-button');


        const getCategoryName = async (id) => {
            try {
                const response = await fetch(`/api/categorias/${id}`);
                const data = await response.json();
                console.log(`Response data for category ID ${id}:`, data); // Debugging
                if (response.ok && data.length > 0) {
                    return data;
                } else {
                    console.error('Error en la respuesta de la API de categorías:', data.message);
                    return 'Categoría desconocida';
                }
            } catch (error) {
                console.error('Error al obtener el nombre de la categoría:', error);
                return 'Categoría desconocida';
            }
        }

        const loadCurso = async (id) => {
            try {
                const response = await fetch(`/api/cursos/${id}`);
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    console.log('Curso cargado');
                    fillForm(data[0]);
                } else {
                    console.error('Error en la respuesta de la API de cursos:', data.message);
                }
            } catch (error) {
                console.error('Error al cargar el curso:', error);
            }
        }

        const fillForm = async (course) => {
            const nameInput = document.getElementById('name');
            const descriptionInput = document.getElementById('description');
            const categoryInput = document.getElementById('category');
            const levelInput = document.getElementById('level');
            const modalityInput = document.getElementById('modality');
            const imageInput = document.getElementById('image');
            const videoInput = document.getElementById('video');
            const certificateInput = document.getElementById('certificate');

            const category = await getCategoryName(course.categoria_id);
            console.log('Categoria:', category);
            console.log('Curso:', course)


            nameInput.value = course.nombre;
            descriptionInput.value = course.descripcion;
            categoryInput.value = category;
            levelInput.value = course.nivel;
            modalityInput.value = course.modalidad;
            videoInput.value = course.video_intro;
            certificateInput.checked = course.iscertified;

            // Crear o seleccionar el elemento img para mostrar la imagen actual
            let currentImageDisplay = document.getElementById('current-course-image');
            if (!currentImageDisplay) {
                currentImageDisplay = document.createElement('img');
                currentImageDisplay.id = 'current-course-image';
                currentImageDisplay.style.maxWidth = '200px'; // Ajusta esto según tus necesidades
                currentImageDisplay.style.marginTop = '10px';
                imageInput.parentNode.insertBefore(currentImageDisplay, imageInput.nextSibling);
            }

            // Establecer la imagen actual
            currentImageDisplay.src = course.imagen;
            currentImageDisplay.alt = 'Imagen actual del curso';
        }

        form.addEventListener('submit', async (e) => {
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

            const idCurso = urlParams.get('id');

            try {
                const response = await fetch(`/api/cursos/${idCurso}`, {
                    method: 'PUT',
                    body: formData
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    console.log('Curso actualizado');
                    window.location.href = 'courses_a.html';
                } else {
                    console.error('Error en la respuesta de la API de cursos:', data.message);
                }
            } catch (error) {
                console.error('Error al actualizar el curso:', error);
            }
        });

        const loadLessons = async (id) => {
            try {
                const response = await fetch(`/api/lecciones/curso/${id}`);
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    console.log('Lecciones cargadas');
                    fillLessons(data);
                } else {
                    console.error('Error en la respuesta de la API de lecciones:', data.message);
                }
            } catch (error) {
                console.error('Error al cargar las lecciones:', error);
            }
        }

        const fillLessons = (lessons) => {
            lessontable.innerHTML = ' <thead>\n' +
                '            <tr>\n' +
                '                <th>Nombre</th>\n' +
                '\n' +
                '                <th>Acciones</th>\n' +
                '            </tr>\n' +
                '        </thead>';
            lessons.forEach(lesson => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${lesson.nombre}</td>
                <td>
                    <button class="edit-button" data-id=${lesson.id}>Editar</button>
                    <button class="delete-button" data-id=${lesson.id}>Eliminar</button>
                </td>
            `;
                lessontable.appendChild(tr);
            });
        }

        if (urlParams.has('id')) {
            const idCurso = urlParams.get('id');
            console.log('id:', idCurso);
            loadCurso(idCurso);
            loadLessons(idCurso);
            lessontable.style.display = 'table';
            btnAddLesson.style.display = 'block';
        }

        lessontable.addEventListener('click', async (e) => {
            if (e.target.classList.contains('edit-button')) {
                const id = e.target.getAttribute('data-id');
                window.location.href = `lesson_a.html?id=${id}&course=${urlParams.get('id')}`;
            }
        });

        btnAddLesson.addEventListener('click', () => {
            window.location.href = `lesson_a.html?course=${urlParams.get('id')}`;
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