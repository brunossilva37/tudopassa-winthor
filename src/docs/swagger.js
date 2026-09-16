const swaggerDocument = {
  openapi: "3.0.3",

  info: {
    title: "TudoPassa Winthor API",
    version: "1.0.0",
    description:
      "API de integração entre o Winthor/Oracle e o TudoPassa.",
  },

  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],

  tags: [
    {
      name: "Sistema",
      description: "Operações da API",
    },
    {
      name: "Autenticação",
      description: "Autenticação da integração",
    },
    {
      name: "Produtos",
      description: "Produtos do Winthor",
    },
    {
      name: "Clientes",
      description: "Clientes do Winthor",
    },
    {
      name: "Fornecedores",
      description: "Fornecedores do Winthor",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Informe somente o token JWT.",
      },
    },

    schemas: {
      LoginRequest: {
        type: "object",
        required: ["usuario", "senha"],
        properties: {
          usuario: {
            type: "string",
            example: "tudopassa",
          },
          senha: {
            type: "string",
            format: "password",
            example: "MinhaSenha123",
          },
        },
      },

      LoginResponse: {
        type: "object",
        properties: {
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIs...",
          },
          tipo: {
            type: "string",
            example: "Bearer",
          },
          expiresIn: {
            type: "string",
            example: "8h",
          },
        },
      },

      Produto: {
        type: "object",
        properties: {
          referencia: {
            type: "string",
            example: "1715036",
          },
          categoria: {
            type: "string",
            example: "CAMISA",
          },
          descricao: {
            type: "string",
            example: "Tudo passa iluminado MCMXCIX",
          },
          unidade: {
            type: "string",
            example: "UN",
          },
          imagem: {
            type: "string",
            example: "1715036.jpeg",
          },
          variantes: {
            type: "array",
            items: {
              $ref: "#/components/schemas/VarianteProduto",
            },
          },
        },
      },

      VarianteProduto: {
        type: "object",
        properties: {
          cor_codigo_nome: {
            type: "string",
            example: "Cinza",
          },
          valor_unitario: {
            type: "number",
            example: 40,
          },
          valor_unitario_tb1: {
            type: "number",
            example: 40,
          },
          valor_unitario_tb2: {
            type: "number",
            example: 38,
          },
          valor_unitario_tb3: {
            type: "number",
            example: 35,
          },
          grade: {
            type: "object",
            properties: {
              PP: {
                type: "number",
                example: 2,
              },
              P: {
                type: "number",
                example: 5,
              },
              M: {
                type: "number",
                example: 8,
              },
              G: {
                type: "number",
                example: 6,
              },
              GG: {
                type: "number",
                example: 3,
              },
              U: {
                type: "number",
                example: 0,
              },
            },
          },
          quantidade_total: {
            type: "number",
            example: 24,
          },
          valor_total: {
            type: "number",
            example: 960,
          },
          valor_total_tb1: {
            type: "number",
            example: 960,
          },
          valor_total_tb2: {
            type: "number",
            example: 912,
          },
          valor_total_tb3: {
            type: "number",
            example: 840,
          },
        },
      },

      Cliente: {
        type: "object",
        properties: {
          codigo: {
            type: "string",
            example: "101",
          },
          nome: {
            type: "string",
            example: "João Silva",
          },
          cpf_cnpj: {
            type: "string",
            example: "123.456.789-00",
          },
          celular: {
            type: "string",
            example: "(11) 98888-7777",
          },
          email: {
            type: "string",
            example: "joao@email.com",
          },
          endereco: {
            type: "string",
            example: "Rua das Flores",
          },
          numero: {
            type: "string",
            example: "50",
          },
          bairro: {
            type: "string",
            example: "Centro",
          },
          cidade: {
            type: "string",
            example: "São Paulo",
          },
          uf: {
            type: "string",
            example: "SP",
          },
          cep: {
            type: "string",
            example: "01001-000",
          },
          data_cadastro: {
            type: "string",
            format: "date-time",
            example: "2023-10-27T14:30:00.000Z",
          },
          formas_pagamento: {
            type: "array",
            items: {
              type: "string",
            },
            example: [
              "Crediário Loja",
              "Cartão Crédito",
            ],
          },
          cartoes_loja: {
            type: "array",
            items: {
              type: "string",
            },
            example: [
              "Visa Tudo Passa",
              "Black VIP",
            ],
          },
          bloqueado: {
            type: "boolean",
            example: false,
          },
          credito_limite: {
            type: "number",
            example: 4555,
          },
          credito_atual: {
            type: "number",
            example: 55,
          },
          foto: {
            type: "string",
            example: "1783102889090-motoqueiro_smart_2.png",
          },
          ref_usuarios: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["patricio"],
          },
        },
      },

      Fornecedor: {
        type: "object",
        properties: {
          codigo: {
            type: "string",
            example: "101",
          },
          nome: {
            type: "string",
            example: "Mario da Silva Sauro",
          },
          cpf_cnpj: {
            type: "string",
            example: "123.456.789-00",
          },
          celular: {
            type: "string",
            example: "(11) 98888-7777",
          },
          email: {
            type: "string",
            example: "joao@email.com",
          },
          endereco: {
            type: "string",
            example: "R. Miguel Ferreira da Silva, 218",
          },
          numero: {
            type: "string",
            example: "50",
          },
          bairro: {
            type: "string",
            example: "Curiacaca",
          },
          cidade: {
            type: "string",
            example: "Caucaia",
          },
          uf: {
            type: "string",
            example: "CE",
          },
          cep: {
            type: "string",
            example: "61.601-172",
          },
          tipo: {
            type: "string",
            example: "Transportadora",
          },
          logomarca: {
            type: "string",
            example: "1783102385351-motoqueiro_smart.png",
          },
          ref_clientes: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["201", "205", "102"],
          },
          ref_produtos: {
            type: "array",
            items: {
              type: "string",
            },
            example: [
              "P-001",
              "P-002",
              "1715036",
              "1716026",
              "1116064",
            ],
          },
          ref_usuarios: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["patricio"],
          },
          data_cadastro: {
            type: "string",
            format: "date-time",
            example: "2023-10-27T14:30:00.000Z",
          },
        },
      },
    },
  },

  paths: {
    "/health": {
      get: {
        tags: ["Sistema"],
        summary: "Verifica o status da API",
        responses: {
          "200": {
            description: "API funcionando",
          },
        },
      },
    },

    "/api/auth/login": {
      post: {
        tags: ["Autenticação"],
        summary: "Realiza login na API",
        description:
          "Autentica o usuário e retorna um token JWT para acesso às rotas protegidas.",

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },

        responses: {
          "200": {
            description: "Login realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },

          "400": {
            description: "Usuário ou senha não informados",
          },

          "401": {
            description: "Usuário ou senha inválidos",
          },

          "500": {
            description: "Erro interno de autenticação",
          },
        },
      },
    },

    "/api/produtos": {
      get: {
        tags: ["Produtos"],
        summary: "Lista os produtos",
        description:
          "Retorna os produtos disponíveis no Winthor no formato esperado pelo TudoPassa.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          "200": {
            description: "Lista de produtos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Produto",
                  },
                },
              },
            },
          },

          "401": {
            description: "Token não informado ou inválido",
          },

          "500": {
            description: "Erro interno",
          },
        },
      },
    },

    "/api/clientes": {
      get: {
        tags: ["Clientes"],
        summary: "Lista os clientes",
        description:
          "Retorna os clientes no formato esperado pelo TudoPassa.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          "200": {
            description: "Lista de clientes",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Cliente",
                  },
                },
              },
            },
          },

          "401": {
            description: "Token não informado ou inválido",
          },

          "500": {
            description: "Erro interno",
          },
        },
      },
    },

    "/api/fornecedores": {
      get: {
        tags: ["Fornecedores"],
        summary: "Lista os fornecedores",
        description:
          "Retorna os fornecedores no formato esperado pelo TudoPassa.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          "200": {
            description: "Lista de fornecedores",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Fornecedor",
                  },
                },
              },
            },
          },

          "401": {
            description: "Token não informado ou inválido",
          },

          "500": {
            description: "Erro interno",
          },
        },
      },
    },
  },
};

export default swaggerDocument;