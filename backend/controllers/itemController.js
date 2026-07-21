const itemModel = require("../models/itemModel");

// Criar item
exports.criarItem = (req, res) => {

    const {
        titulo,
        descricao,
        categoria_id,
        estado
    } = req.body;

    const item = {
        titulo,
        descricao,
        categoria_id,
        estado,
        imagens_itens: req.file ? req.file.filename : null,
        usuario_id: req.usuario.id
    };

    itemModel.criarItem(item, (err) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao cadastrar item."
            });
        }

        return res.status(201).json({
            mensagem: "Item cadastrado com sucesso!"
        });

    });

};

// Listar itens
exports.listarItens = (req, res) => {

    itemModel.listarItens((err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao listar itens."
            });
        }

        return res.status(200).json(results);

    });

};

// Atualizar item
exports.atualizarItem = (req, res) => {

    const item = {
        id: req.params.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria_id: req.body.categoria_id,
        estado: req.body.estado,
        usuario_id: req.usuario.id
    };

    itemModel.atualizarItem(item, (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao atualizar item."
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Item não encontrado ou você não tem permissão."
            });
        }

        return res.status(200).json({
            mensagem: "Item atualizado com sucesso!"
        });

    });

};

// Excluir item
exports.excluirItem = (req, res) => {

    const id = req.params.id;
    const usuario_id = req.usuario.id;

    itemModel.excluirItem(id, usuario_id, (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao excluir item."
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Item não encontrado ou você não tem permissão."
            });
        }

        return res.status(200).json({
            mensagem: "Item excluído com sucesso!"
        });

    });

};