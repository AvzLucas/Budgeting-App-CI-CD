# Budgeting-App-CI-CD

Calculadora de orçamento de serviços para aprender testes unitários, build, CI/CD e deploy, uma etapa de cada vez.

## Executar localmente

Requisito: Node.js 20.19+ na linha 20, ou 22.12+ (recomendado: Node 24 LTS), com npm.

No terminal do VS Code, dentro desta pasta:

```powershell
npm ci
npm run dev
```

Abra o endereço mostrado no terminal. Para encerrar o servidor, pressione Ctrl+C.
As dependências já foram instaladas durante a criação; use `npm ci` para reproduzir a instalação pelo `package-lock.json`.

## Testes e build

```powershell
npm test
npm run build
npm run preview
```

- `npm test`: executa os testes uma vez e informa sucesso ou falha.
- `npm run test:watch`: repete os testes ao salvar alterações; Ctrl+C encerra.
- `npm run build`: gera os arquivos estáticos em `dist/`.
- `npm run preview`: permite visualizar localmente o build já gerado. Não publica a aplicação.

Vite cuida do servidor local e do build; Vitest executa os testes.
Referências: [Vite](https://vite.dev/guide/) e [Vitest](https://vitest.dev/guide/cli).

## Regras de cálculo

1. Subtotal = valor por hora × quantidade de horas, arredondado para centavos.
2. Desconto = subtotal × percentual / 100, arredondado para centavos.
3. Total = subtotal − desconto.

Exemplo: R$ 100/h × 8 horas = R$ 800; com 10% de desconto, total de R$ 720.
Zero e horas fracionadas são permitidos. Desconto entre 0% e 100%.
Valor por hora limitado a R$ 1.000.000 e horas a 100.000.
A tela aceita até duas casas decimais. Campos vazios, negativos ou fora dos limites não são aceitos.
Ao editar um campo, o resultado anterior é limpo; clique em Calcular orçamento para atualizar.
Não há impostos, armazenamento nem envio de dados.

## Organização

- `index.html`: campos e resumo do orçamento.
- `src/main.js`: liga o formulário à função de cálculo e formata reais.
- `src/budget.js`: regra de cálculo independente da tela.
- `src/budget.test.js`: exemplos e casos inválidos verificados automaticamente.
- `src/style.css`: apresentação e adaptação para celular.
- `package-lock.json`: versões exatas para reproduzir a instalação.

Os testes unitários verificam a regra de cálculo; não substituem a conferência da interface no navegador.

## Ponto de parada

Esta etapa entrega a aplicação local, os testes e o build. Publicação no GitHub, GitHub Actions, pipeline CI/CD e deploy ficam para a próxima etapa acompanhada.
