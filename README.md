# Projeto Multi-Parte

Este repositório contém três partes principais: uma API desenvolvida em C# .NET, um frontend desenvolvido em React, e um desafio em JavaScript.

## Estrutura do Projeto

- **api/**: Contém o backend desenvolvido em C# .NET.
- **front/**: Contém o frontend desenvolvido em React.
- **desafio1/**: Contém um script em JavaScript chamado `suportesBalanceados.js`.

## Como Iniciar o Projeto

### Desafio 1 - Suportes Balanceados

O arquivo `suportesBalanceados.js` é uma função JavaScript que pode ser executada no terminal com Node.js.

#### Passos:
1. Navegue até a pasta `desafio1`.
2. Execute o comando `node suportesBalanceados.js` no terminal.

### Iniciando a API (C# .NET)

#### Passos:
1. Navegue até a pasta `api`.
2. Restaure as dependências com `dotnet restore`.
3. Configure o CORS para permitir requisições do frontend (veja o arquivo `Program.cs`).
4. Inicie a API com `dotnet run`.

### Iniciando o Frontend (React)

#### Passos:
1. Navegue até a pasta `front`.
2. Instale as dependências com `npm install`.
3. Verifique e configure o endereço da API no arquivo `src/core/httpClient.ts`.
4. Inicie o frontend com `npm run dev`.

## Considerações Finais

- Verifique se as portas e URLs estão corretas.
- Ajuste o CORS para garantir a comunicação entre o frontend e a API.
