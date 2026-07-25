# Plano Certo

Aplicativo web para professores de todos os níveis planejarem aulas de forma
rápida, alinhadas à BNCC (incluindo a BNCC Computação), com suporte a turmas
típicas, turmas adultas (EJA) e alunos com necessidades específicas.

O professor informa a turma, o tema da aula e as habilidades da BNCC
desejadas; o app gera automaticamente um plano de aula estruturado
(objetivos, metodologia, desenvolvimento, avaliação e adaptações), pronto
para revisão, edição e impressão/exportação em PDF.

Nesta primeira versão (MVP) o app roda inteiramente no navegador, sem login:
os planos salvos ficam armazenados apenas no `localStorage` do dispositivo
usado.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Outros comandos: `npm run build` (build de produção), `npm run lint`
(oxlint), `npm run preview` (servir o build).

## Sobre os dados da BNCC

Para garantir fidelidade ao texto oficial, o app não tenta reproduzir de
memória os milhares de códigos/habilidades da BNCC — isso seria arriscado e
sujeito a erro. Em vez disso:

- As **10 Competências Gerais**, as **etapas de ensino**, os **componentes
  curriculares/campos de experiência** e os **3 eixos da BNCC Computação**
  (Pensamento Computacional, Mundo Digital, Cultura Digital) são dados
  estruturais reais, definidos em `src/data/bncc/`.
- As **habilidades específicas** (códigos como `EF67LP08`) são fornecidas
  como uma pequena **amostra ilustrativa** (`src/data/bncc/habilidadesExemplo.ts`,
  claramente marcada como "exemplo"), só para demonstrar o funcionamento.
- Para uso real, importe o dataset oficial completo (convertido para JSON) na
  página **"Importar BNCC"** do próprio app — veja o formato esperado lá.

## Estrutura do projeto

- `src/types.ts` — modelo de domínio (etapas, componentes, habilidades,
  perfil de turma, plano de aula).
- `src/data/bncc/` — dados de referência da BNCC.
- `src/lib/` — persistência local (`planosStore`, `habilidadesStore`) e o
  motor de geração de conteúdo (`gerarPlano.ts`, `adaptacoes.ts`).
- `src/wizard/` — fluxo guiado de criação/edição de plano de aula.
- `src/pages/` — dashboard, visualização de plano e importação de BNCC.

## Próximos passos sugeridos

- Planejamento em outros horizontes (sequência didática, bimestral,
  semestral, anual) reaproveitando os mesmos planos de aula.
- Conta de usuário e sincronização entre dispositivos.
- Versão mobile.
