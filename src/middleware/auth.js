import { Router } from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({
        erro: "Usuário e senha são obrigatórios",
      });
    }

    const authUser = process.env.AUTH_USER;
    const authPasswordHash = process.env.AUTH_PASSWORD_HASH;

    if (!authUser || !authPasswordHash) {
      console.error("AUTH_USER ou AUTH_PASSWORD_HASH não configurado");

      return res.status(500).json({
        erro: "Autenticação não configurada",
      });
    }

    if (usuario !== authUser) {
      return res.status(401).json({
        erro: "Usuário ou senha inválidos",
      });
    }

    const senhaValida = await argon2.verify(
      authPasswordHash,
      senha
    );

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Usuário ou senha inválidos",
      });
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || "8h";

    const token = jwt.sign(
      {
        sub: usuario,
      },
      process.env.JWT_SECRET,
      {
        expiresIn,
      }
    );

    return res.json({
      token,
      tipo: "Bearer",
      expiresIn,
    });
  } catch (error) {
    console.error("Erro no login:", error);

    return res.status(500).json({
      erro: "Erro interno na autenticação",
    });
  }
});

export default router;