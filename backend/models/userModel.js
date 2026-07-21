const db = require("../config/database");


function criarUsuario(usuario, callback) {
    const sql = `
        INSERT INTO usuarios
        (nome, email, telefone, cpf, senha, cidade, bairro, endereco, foto_perfil, foto_documento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        usuario.nome,
        usuario.email,
        usuario.telefone,
        usuario.cpf,
        usuario.senha,
        usuario.cidade,
        usuario.bairro,
        usuario.endereco,
        usuario.foto_perfil,
        usuario.foto_documento
    ], callback);
}



function buscarPorEmailOuCpf(email, cpf, callback) {
    const sql = `
        SELECT * FROM usuarios
        WHERE email = ? OR cpf = ?
    `;

    db.query(sql, [email, cpf], callback);
}


function buscarPorEmail(email, callback) {
    const sql = `
        SELECT * FROM usuarios
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
}


module.exports = {
    criarUsuario,
    buscarPorEmailOuCpf,
    buscarPorEmail
};