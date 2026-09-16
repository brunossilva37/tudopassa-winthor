import jwt from "jsonwebtoken";

export default function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      erro: "Token não informado",
    });
  }

  const [tipo, token] = authorization.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({
      erro: "Formato de autorização inválido",
    });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("JWT_SECRET não configurado");

    return res.status(500).json({
      erro: "Autenticação não configurada",
    });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);

    req.user = payload;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        erro: "Token expirado",
      });
    }

    return res.status(401).json({
      erro: "Token inválido",
    });
  }
}