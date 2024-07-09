const { pool } = require('../database/dbConfig');

const getLecciones = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM leccion');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las lecciones:', error);
    }
}

const getLeccionById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM leccion WHERE id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener la leccion:', error);
    }
}

const getLeccionesByCurso = async (req, res) => {
    try {
        const idcurso = req.params.idcurso;
        const response = await pool.query('SELECT * FROM leccion WHERE idcurso = $1', [idcurso]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las lecciones:', error);
    }

}

//leccion tiene los siguientes campos: nombre, descripcion, idcurso, imagen, video
const createLeccion = async (req, res) => {
    try {
        const { nombre, descripcion, idcurso, imagen, video , orden} = req.body;
        await pool.query('INSERT INTO leccion (nombre, descripcion, idcurso, imagen, video, orden) VALUES ($1, $2, $3, $4, $5, $6)', [nombre, descripcion, idcurso, imagen, video, orden]);
        res.status(200).json({
            message: 'Leccion creada correctamente',
            body: {
                leccion: { nombre, descripcion, idcurso, imagen, video, orden }
            }
        });
    } catch (error) {
        console.error('Error al crear la leccion:', error);
    }
}

const createLeccionNoImagen = async (req, res) => {
    try {
        const { nombre, descripcion, idcurso, video, orden } = req.body;
        await pool.query('INSERT INTO leccion (nombre, descripcion, idcurso, video, orden) VALUES ($1, $2, $3, $4, $5)', [nombre, descripcion, idcurso, video, orden]);
        res.status(200).json({
            message: 'Leccion creada correctamente',
            body: {
                leccion: { nombre, descripcion, idcurso, video, orden }
            }
        });
    } catch (error) {
        console.error('Error al crear la leccion:', error);
    }
}

const createLeccionNoVideo = async (req, res) => {
    try {
        const { nombre, descripcion, idcurso, imagen, orden } = req.body;
        await pool.query('INSERT INTO leccion (nombre, descripcion, idcurso, imagen, orden) VALUES ($1, $2, $3, $4, $5)', [nombre, descripcion, idcurso, imagen, orden]);
        res.status(200).json({
            message: 'Leccion creada correctamente',
            body: {
                leccion: { nombre, descripcion, idcurso, imagen, orden }
            }
        });
    } catch (error) {
        console.error('Error al crear la leccion:', error);
    }
}

const createLeccionNoImagenNoVideo = async (req, res) => {
    try {
        const { nombre, descripcion, idcurso, orden } = req.body;
        console.log('Datos recibidos en el servidor:', { nombre, descripcion, idcurso, orden }); // Log para verificar los datos recibidos
        await pool.query('INSERT INTO leccion (nombre, descripcion, idcurso, orden) VALUES ($1, $2, $3, $4)', [nombre, descripcion, idcurso, orden]);
        res.status(200).json({
            message: 'Leccion creada correctamente',
            body: {
                leccion: { nombre, descripcion, idcurso, orden }
            }
        });
    } catch (error) {
        console.error('Error al crear la leccion:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateLeccion = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion, idcurso, imagen, video, orden } = req.body;
        await pool.query('UPDATE leccion SET nombre = $1, descripcion = $2, idcurso = $3, imagen = $4, video = $5, orden = $6 WHERE id = $7', [nombre, descripcion, idcurso, imagen, video,orden, id]);
        res.status(200).json({
            message: 'Leccion actualizada correctamente',
            body: {
                leccion: { nombre, descripcion, idcurso, imagen, video, orden }
            }
        });
    } catch (error) {
        console.error('Error al actualizar la leccion:', error);
    }
}

const deleteLeccion = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM leccion WHERE id = $1', [id]);
        res.status(200).json({
            message: 'Leccion eliminada correctamente',
            body: {
                leccion: { id }
            }
        });
    } catch (error) {
        console.error('Error al eliminar la leccion:', error);
    }
}


module.exports = {
    getLecciones,
    getLeccionById,
    getLeccionesByCurso,
    createLeccion,
    createLeccionNoImagen,
    createLeccionNoVideo,
    createLeccionNoImagenNoVideo,
    updateLeccion,
    deleteLeccion
};

