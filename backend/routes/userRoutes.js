const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const verificarToken = require("../middleware/auth");

router.post("/cadastro", userController.cadastrarUsuario);
router.post("/login", userController.loginUsuario);

router.get(
    "/perfil",
    verificarToken,
    userController.buscarPerfil
);
router.put(
    "/perfil",
    verificarToken,
    userController.atualizarPerfil
);
router.delete(
    "/perfil",
    verificarToken,
    userController.excluirPerfil
);

module.exports = router;