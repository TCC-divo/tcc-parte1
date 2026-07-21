const db = require("../config/database");

// Criar solicitação
function criarSolicitacao(solicitacao, callback) {
    const sql = `
        INSERT INTO solicitacoes
        (item_id, usuario_id, mensagem)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            solicitacao.item_id,
            solicitacao.usuario_id,
            solicitacao.mensagem
        ],
        callback
    );
}

// Listar solicitações do usuário
function listarMinhasSolicitacoes(usuario_id, callback) {
    const sql = `
        SELECT
            s.*,
            i.titulo AS item
        FROM solicitacoes s
        JOIN itens i ON s.item_id = i.id
        WHERE s.usuario_id = ?
        ORDER BY s.criado_em DESC
    `;

    db.query(sql, [usuario_id], callback);
}

// Atualizar status
function atualizarStatus(id, status, callback) {
    const sql = `
        UPDATE solicitacoes
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], callback);
}

// Excluir solicitação
function excluirSolicitacao(id, usuario_id, callback) {
    const sql = `
        DELETE FROM solicitacoes
        WHERE id = ? AND usuario_id = ?
    `;

    db.query(sql, [id, usuario_id], callback);
}

module.exports = {
    criarSolicitacao,
    listarMinhasSolicitacoes,
    atualizarStatus,
    excluirSolicitacao
};