const { pool } = require('../database/dbConfig');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Configurar Multer para usar una carpeta temporal
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const tempDir = path.join(__dirname, '../../public/assets/images/temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Limitar a 50MB
});

const createCurso = async (req, res) => {
    upload.single('image')(req, res, async function (err) {
        if (err) {
            console.error('Error al subir la imagen:', err.message);
            return res.status(400).json({ error: err.message });
        }

        console.log('Archivo subido con éxito:', req.file);

        if (!req.file) {
            console.error('No se recibió ningún archivo. Asegúrese de que el tamaño del archivo no excede el límite permitido.');
            return res.status(400).json({ error: 'No se recibió ningún archivo. Asegúrese de que el tamaño del archivo no excede el límite permitido.' });
        }

        const { nombre, descripcion, duration, nivel, modalidad, video_intro, categoria_id, certificado } = req.body;
        console.log('Intentando crear curso con datos:', { nombre, descripcion, duration, nivel, modalidad, video_intro, categoria_id, certificado });

        try {
            const response = await pool.query(
                'INSERT INTO curso (nombre, descripcion, duration, nivel, modalidad, video_intro, categoria_id, iscertified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
                [nombre, descripcion, duration, nivel, modalidad, video_intro, categoria_id, certificado]
            );

            const cursoId = response.rows[0].id;
            console.log('Curso creado con ID:', cursoId);

            // Mover la imagen de la carpeta temp a una carpeta específica del curso
            const tempPath = req.file.path;
            const finalDir = path.join(__dirname, '../../public/assets/images', cursoId.toString());
            if (!fs.existsSync(finalDir)) {
                fs.mkdirSync(finalDir, { recursive: true });
            }
            const finalPath = path.join(finalDir, req.file.filename);
            fs.renameSync(tempPath, finalPath);
            console.log('Imagen movida a:', finalPath);

            // Actualizar la ruta de la imagen en la base de datos
            const imagenPath = path.relative(path.join(__dirname, '../../public'), finalPath);
            let ruta = imagenPath.split('\\');
            let rutaRelativa = "../../images/" + ruta[2] + "/" + ruta[3]
            console.log('Ruta de la imagen:', imagenPath);
            console.log('Ruta relativa de la imagen:', rutaRelativa);
            await pool.query(
                'UPDATE curso SET imagen = $1 WHERE id = $2',
                [rutaRelativa, cursoId]
            );

            res.status(201).json({
                message: 'Curso creado correctamente',
                body: {
                    curso: { id: cursoId, nombre, descripcion, duration, nivel, modalidad, video_intro, categoria_id, imagen: imagenPath, certificado }
                }
            });
        } catch (error) {
            console.error('Error al crear el curso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
};

const getCursos = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM curso');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getCursoById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM curso WHERE id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener el curso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateCurso = async (req, res) => {
    upload.single('image')(req, res, async function (err) {
        if (err) {
            console.error('Error al subir la imagen:', err.message);
            return res.status(400).json({ error: err.message });
        }

        console.log('Archivo subido con éxito:', req.file);

        const { nombre, descripcion, duration, nivel, modalidad, video_intro, categoria_id, certificado } = req.body;
        const id = req.params.id;
        console.log('Intentando actualizar curso con datos:', { id, nombre, descripcion, duration, nivel, modalidad, video_intro, categoria_id, certificado });

        try {
            let imagenPath = null;
            if (req.file) {
                // Mover la imagen de la carpeta temp a una carpeta específica del curso
                const tempPath = req.file.path;
                const finalDir = path.join(__dirname, '../../public/assets/images', id.toString());
                if (!fs.existsSync(finalDir)) {
                    fs.mkdirSync(finalDir, { recursive: true });
                }
                const finalPath = path.join(finalDir, req.file.filename);
                fs.renameSync(tempPath, finalPath);
                console.log('Imagen movida a:', finalPath);

                // Actualizar la ruta de la imagen
                imagenPath = path.relative(path.join(__dirname, '../../public'), finalPath);
                let ruta = imagenPath.split('\\');
                let rutaRelativa = "../../images/" + ruta[2] + "/" + ruta[3]
                console.log('Ruta de la imagen:', imagenPath);
                console.log('Ruta relativa de la imagen:', rutaRelativa);

                await pool.query(
                    'UPDATE curso SET imagen = $1 WHERE id = $2',
                    [rutaRelativa, id]
                );
            }

            // Actualizar los detalles del curso
            await pool.query(
                'UPDATE curso SET nombre = $1, descripcion = $2, duration = $3, nivel = $4, modalidad = $5, video_intro = $6, categoria_id = $7, iscertified = $8 WHERE id = $9',
                [nombre, descripcion, duration, nivel, modalidad, video_intro, categoria_id, certificado, id]
            );

            res.status(200).json({
                message: 'Curso actualizado correctamente',
                body: {
                    curso: { id, nombre, descripcion, duration, nivel, modalidad, video_intro, categoria_id, imagen: imagenPath, certificado }
                }
            });
        } catch (error) {
            console.error('Error al actualizar el curso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
};

const deleteCurso = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM curso WHERE id = $1', [id]);
        res.status(200).json({
            message: 'Curso eliminado correctamente',
            body: {
                curso: { id }
            }
        });
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,
    upload // Exportamos upload para usarlo en las rutas
};
