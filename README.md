# TudoPassa Winthor

API Node.js para disponibilizar dados do Winthor/Oracle no contrato esperado pelo TudoPassa.

A aplicação funciona como uma camada de integração entre o **Winthor/Oracle** e o **TudoPassaBack**, permitindo que o TudoPassa consuma os dados através de uma API HTTP/JSON padronizada.

## Arquitetura

```text
TudoPassaBack
     |
     | HTTP / JSON + JWT
     v
TudoPassa Winthor API
     |
     | oracledb
     v
Oracle / Winthor
