# Jardim dos Pets Toys - E-commerce de Produtos 3D

Este é um projeto de e-commerce para a loja "Jardim dos Pets Toys", especializada em produtos personalizados para pets utilizando impressão 3D.

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **3D**: Three.js, React Three Fiber, React Three Drei
- **Roteamento**: React Router
- **Gerenciamento de Estado**: Context API
- **Requisições HTTP**: Axios

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
frontend/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── 3d/          # Componentes relacionados a 3D
│   │   ├── layout/      # Componentes de layout
│   │   ├── product/     # Componentes relacionados a produtos
│   │   └── ui/          # Componentes de UI
│   ├── context/         # Contextos React
│   ├── hooks/           # Hooks personalizados
│   ├── pages/           # Páginas da aplicação
│   │   ├── admin/       # Páginas de administração
│   │   ├── auth/        # Páginas de autenticação
│   │   ├── categories/  # Páginas de categorias
│   │   └── customer/    # Páginas de cliente
│   ├── services/        # Serviços e APIs
│   ├── types/           # Definições de tipos TypeScript
│   ├── utils/           # Funções utilitárias
│   ├── App.tsx          # Componente principal
│   ├── config.ts        # Configurações da aplicação
│   ├── index.css        # Estilos globais
│   └── main.tsx         # Ponto de entrada
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Funcionalidades

- **Catálogo de Produtos**: Navegação por categorias e produtos
- **Personalização 3D**: Upload e visualização de modelos 3D
- **Carrinho de Compras**: Adição, remoção e atualização de itens
- **Checkout**: Processo de finalização de compra
- **Autenticação**: Login, registro e recuperação de senha
- **Painel do Cliente**: Gerenciamento de pedidos, endereços e modelos 3D
- **Painel de Administração**: Gerenciamento de produtos, pedidos, clientes e impressoras 3D

## Páginas Implementadas

- **Home**: Página inicial com produtos em destaque
- **Personalização 3D**: Upload e customização de modelos 3D
- **Carrinho**: Gerenciamento de itens no carrinho
- **Login/Registro**: Autenticação de usuários
- **Dashboard do Cliente**: Visão geral da conta do cliente
- **Dashboard do Admin**: Visão geral do painel administrativo
- **Categoria Pets**: Listagem de produtos para pets

## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```
   cd frontend
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse a aplicação em `http://localhost:12000`

## Próximos Passos

- Implementar as páginas restantes
- Integrar com backend
- Adicionar funcionalidade de pagamento
- Melhorar a visualização 3D
- Implementar sistema de avaliações e comentários
- Adicionar funcionalidade de busca

## Licença

Este projeto está licenciado sob a licença MIT.