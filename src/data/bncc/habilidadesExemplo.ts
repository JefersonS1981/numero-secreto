import type { HabilidadeBNCC } from '../../types'

// IMPORTANTE — Dataset ilustrativo (NÃO é o texto oficial da BNCC):
// Os milhares de códigos e descrições de habilidades da BNCC (por
// componente, etapa e ano) mudam de forma muito granular e devem vir da
// fonte oficial (MEC / Base Nacional Comum Curricular, basenacionalcomum.
// mec.gov.br) para garantir fidelidade total ao texto legal.
//
// Os itens abaixo usam códigos no formato "EXEMPLO-..." (propositalmente
// diferente do formato oficial "EF01LP01") apenas para demonstrar o
// funcionamento do app. Use a função de importação (ver
// src/lib/habilidadesStore.ts) para carregar a planilha oficial completa
// e substituir/complementar estes exemplos.
export const HABILIDADES_EXEMPLO: HabilidadeBNCC[] = [
  {
    codigo: 'EXEMPLO-CE-01',
    etapa: 'educacao_infantil',
    anoOuFaixa: 'Bebês e crianças bem pequenas',
    componenteId: 'ce_escuta_fala_pensamento_imaginacao',
    descricao:
      'Participar de situações de escuta de histórias, poemas e cantigas, ampliando o vocabulário e o gosto pela linguagem oral.',
    competenciasGerais: [1, 4, 9],
    origem: 'exemplo',
  },
  {
    codigo: 'EXEMPLO-LP-F1-01',
    etapa: 'fundamental1',
    anoOuFaixa: '1º ao 3º ano',
    componenteId: 'lingua_portuguesa',
    unidadeTematica: 'Leitura/escuta',
    descricao:
      'Ler e compreender, de forma autônoma, pequenos textos narrativos, identificando personagens, tempo e espaço.',
    competenciasGerais: [1, 4],
    origem: 'exemplo',
  },
  {
    codigo: 'EXEMPLO-MA-F1-01',
    etapa: 'fundamental1',
    anoOuFaixa: '4º e 5º ano',
    componenteId: 'matematica',
    unidadeTematica: 'Números',
    descricao:
      'Resolver e elaborar problemas envolvendo as quatro operações com números naturais, em situações do cotidiano.',
    competenciasGerais: [2, 7],
    origem: 'exemplo',
  },
  {
    codigo: 'EXEMPLO-CI-F2-01',
    etapa: 'fundamental2',
    anoOuFaixa: '6º e 7º ano',
    componenteId: 'ciencias',
    unidadeTematica: 'Vida e evolução',
    descricao:
      'Investigar e explicar as relações entre os seres vivos e o ambiente em um ecossistema local.',
    competenciasGerais: [2, 10],
    origem: 'exemplo',
  },
  {
    codigo: 'EXEMPLO-HI-M-01',
    etapa: 'medio',
    anoOuFaixa: '1ª a 3ª série',
    componenteId: 'historia',
    descricao:
      'Analisar processos históricos relacionados à formação socioeconômica do Brasil contemporâneo, articulando diferentes fontes.',
    competenciasGerais: [1, 7],
    origem: 'exemplo',
  },
  {
    codigo: 'EXEMPLO-EJA-LP-01',
    etapa: 'eja',
    anoOuFaixa: 'Anos finais / EJA',
    componenteId: 'lingua_portuguesa',
    descricao:
      'Produzir textos de caráter argumentativo relacionados a situações do mundo do trabalho e da vida cotidiana, valorizando a experiência de vida do estudante.',
    competenciasGerais: [4, 6, 7],
    origem: 'exemplo',
  },
  {
    codigo: 'EXEMPLO-COMP-PC-F1-01',
    etapa: 'fundamental1',
    anoOuFaixa: '1º ao 5º ano',
    componenteId: 'computacao',
    eixoComputacao: 'pensamento_computacional',
    descricao:
      'Utilizar sequências de instruções (algoritmos) para resolver problemas simples do cotidiano, com ou sem uso de dispositivos digitais (ex.: robótica desplugada).',
    competenciasGerais: [2, 5],
    origem: 'exemplo',
  },
  {
    codigo: 'EXEMPLO-COMP-MD-F2-01',
    etapa: 'fundamental2',
    anoOuFaixa: '6º ao 9º ano',
    componenteId: 'computacao',
    eixoComputacao: 'mundo_digital',
    descricao:
      'Compreender como dados são coletados, armazenados e processados por sistemas digitais, reconhecendo riscos e benefícios envolvidos.',
    competenciasGerais: [2, 5],
    origem: 'exemplo',
  },
  {
    codigo: 'EXEMPLO-COMP-CD-M-01',
    etapa: 'medio',
    anoOuFaixa: '1ª a 3ª série',
    componenteId: 'computacao',
    eixoComputacao: 'cultura_digital',
    descricao:
      'Avaliar de forma crítica e ética o próprio comportamento e o de terceiros nas redes sociais e outros ambientes digitais, considerando segurança e privacidade.',
    competenciasGerais: [5, 7, 9, 10],
    origem: 'exemplo',
  },
]
