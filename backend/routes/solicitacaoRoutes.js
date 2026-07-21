const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/auth");
const solicitacaoController = require("../controllers/solicitacaoController");

// Criar solicitação
router.post(
    "/",
    verificarToken,
    solicitacaoController.criarSolicitacao
);

// Listar minhas solicitações
router.get(
    "/minhas",
    verificarToken,
    solicitacaoController.listarMinhasSolicitacoes
);

// Atualizar status
router.put(
    "/:id",
    verificarToken,
    solicitacaoController.atualizarStatus
);

// Excluir solicitação
router.delete(
    "/:id",
    verificarToken,
    solicitacaoController.excluirSolicitacao
);

module.exports = router;