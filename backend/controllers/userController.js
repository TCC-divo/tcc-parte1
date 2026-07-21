const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");


exports.cadastrarUsuario = async (req, res) => {
    try {
        const {
            nome,
            email,
            telefone,
            cpf,
            senha,
            cidade,
            bairro,
            endereco
        } = req.body;

        if (!nome || !email || !cpf || !senha) {
            return res.status(400).json({
                mensagem: "Preencha todos os campos obrigatórios."
            });
        }

        userModel.buscarPorEmailOuCpf(email, cpf, async (err, results) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao verificar usuário."
                });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    mensagem: "E-mail ou CPF já cadastrado."
                });
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const usuario = {
                nome,
                email,
                telefone,
                cpf,
                senha: senhaCriptografada,
                cidade,
                bairro,
                endereco,
                foto_perfil: null,
                foto_documento: null
            };

            userModel.criarUsuario(usuario, (err) => {

                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        mensagem: "Erro ao criar usuário."
                    });
                }

                return res.status(201).json({
                    mensagem: "Usuário criado com sucesso!"
                });

            });

        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};

exports.loginUsuario = (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "Informe e-mail e senha."
        });
    }

    userModel.buscarPorEmail(email, async (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao buscar usuário."
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                mensagem: "E-mail ou senha inválidos."
            });
        }

        const usuario = results[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "E-mail ou senha inválidos."
            });
        }

        return res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    });

};