const solicitacaoModel = require("../models/solicitacaoModel");

// Criar solicitação
exports.criarSolicitacao = (req, res) => {

    const solicitacao = {
        item_id: req.body.item_id,
        usuario_id: req.usuario.id,
        mensagem: req.body.mensagem
    };

    solicitacaoModel.criarSolicitacao(solicitacao, (err) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao criar solicitação."
            });
        }

        return res.status(201).json({
            mensagem: "Solicitação enviada com sucesso!"
        });

    });

};

// Listar minhas solicitações
exports.listarMinhasSolicitacoes = (req, res) => {

    solicitacaoModel.listarMinhasSolicitacoes(req.usuario.id, (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao listar solicitações."
            });
        }

        return res.status(200).json(results);

    });

};

// Atualizar status
exports.atualizarStatus = (req, res) => {

    solicitacaoModel.atualizarStatus(
        req.params.id,
        req.body.status,
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao atualizar status."
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Solicitação não encontrada."
                });
            }

            return res.status(200).json({
                mensagem: "Status atualizado com sucesso!"
            });

        }
    );

};

// Excluir solicitação
exports.excluirSolicitacao = (req, res) => {

    solicitacaoModel.excluirSolicitacao(
        req.params.id,
        req.usuario.id,
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao excluir solicitação."
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Solicitação não encontrada."
                });
            }

            return res.status(200).json({
                mensagem: "Solicitação excluída com sucesso!"
            });

        }
    );

};