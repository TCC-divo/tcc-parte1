const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploads");
const verificarToken = require("../middleware/auth");
const itemController = require("../controllers/itemController");

router.get("/", itemController.listarItens);
router.post(
    "/",
    verificarToken,
    upload.single("imagem"),
    itemController.criarItem
);
router.put(
    "/:id",
    verificarToken,
    itemController.atualizarItem
);
router.delete(
    "/:id",
    verificarToken,
    itemController.excluirItem
); 
module.exports = router;