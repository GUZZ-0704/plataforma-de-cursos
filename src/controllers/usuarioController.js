const {
    getUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getCategoryNameById
} = require('../models/usuario');
const bcrypt = require('bcrypt');


const getUsuariosController = async (req, res) => {
    await getUsuarios(req, res);
}

const getUsuarioByIdController = async (req, res) => {
    await getUsuarioById(req, res);
}

const createUsuarioController = async (req, res) => {
    await createUsuario(req, res);
}

const updateUsuarioController = async (req, res) => {
    await updateUsuario(req, res);
}

const deleteUsuarioController = async (req, res) => {
    await deleteUsuario(req, res);
}

const loginUsuarioController = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const usuario = await getUsuarioByEmail(email);
        if (usuario) {
            const match = await bcrypt.compare(password, usuario.password);
            if (match) {
                res.status(200).json({
                    message: 'Usuario logueado correctamente',
                    body: {
                        usuario
                    }
                });
            } else {
                res.status(401).json({
                    message: 'Contraseña incorrecta'
                });
            }
        } else {
            res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
    } else {
        res.status(400).json({
            message: 'Petición incorrecta'
        });
    }
}

const getCategoryNameByIdController = async (req, res) => {
    const id = req.params.id;
    const nombre = await getCategoryNameById(id);
    res.status(200).json(nombre);

}

module.exports = {
    getUsuariosController,
    getUsuarioByIdController,
    createUsuarioController,
    updateUsuarioController,
    deleteUsuarioController,
    loginUsuarioController,
    getCategoryNameByIdController
};