// Modelo de domínio do ensina.ai — planejamento de aulas alinhado à BNCC.

export type EtapaEnsino =
  | 'educacao_infantil'
  | 'fundamental1'
  | 'fundamental2'
  | 'medio'
  | 'eja'

export const ETAPAS: { id: EtapaEnsino; nome: string }[] = [
  { id: 'educacao_infantil', nome: 'Educação Infantil' },
  { id: 'fundamental1', nome: 'Ensino Fundamental — Anos Iniciais (1º ao 5º ano)' },
  { id: 'fundamental2', nome: 'Ensino Fundamental — Anos Finais (6º ao 9º ano)' },
  { id: 'medio', nome: 'Ensino Médio' },
  { id: 'eja', nome: 'Educação de Jovens e Adultos (EJA)' },
]

export type AreaConhecimento =
  | 'campos_experiencia'
  | 'linguagens'
  | 'matematica'
  | 'ciencias_natureza'
  | 'ciencias_humanas'
  | 'ensino_religioso'
  | 'computacao'

export interface ComponenteCurricular {
  id: string
  nome: string
  area: AreaConhecimento
  etapas: EtapaEnsino[]
}

export interface CompetenciaGeral {
  numero: number
  texto: string
}

export type EixoComputacao =
  | 'pensamento_computacional'
  | 'mundo_digital'
  | 'cultura_digital'

export const EIXOS_COMPUTACAO: { id: EixoComputacao; nome: string; descricao: string }[] = [
  {
    id: 'pensamento_computacional',
    nome: 'Pensamento Computacional',
    descricao:
      'Conceitos e práticas para resolver problemas de forma sistemática: abstração, decomposição, reconhecimento de padrões e algoritmos.',
  },
  {
    id: 'mundo_digital',
    nome: 'Mundo Digital',
    descricao:
      'Compreensão de como as tecnologias digitais funcionam e são usadas, incluindo dados, redes e dispositivos.',
  },
  {
    id: 'cultura_digital',
    nome: 'Cultura Digital',
    descricao:
      'Participação crítica, ética e cidadã na cultura digital, incluindo segurança, privacidade e impacto social da tecnologia.',
  },
]

export interface HabilidadeBNCC {
  codigo: string
  etapa: EtapaEnsino
  anoOuFaixa: string
  componenteId: string
  unidadeTematica?: string
  objetoConhecimento?: string
  descricao: string
  competenciasGerais?: number[]
  eixoComputacao?: EixoComputacao
  origem?: 'oficial' | 'importado' | 'exemplo'
}

export type TagNecessidadeEspecifica =
  | 'tea'
  | 'tdah'
  | 'deficiencia_intelectual'
  | 'deficiencia_fisica'
  | 'deficiencia_visual'
  | 'deficiencia_auditiva'
  | 'altas_habilidades'
  | 'transtorno_aprendizagem'
  | 'outra'

export const NECESSIDADES_ESPECIFICAS: { id: TagNecessidadeEspecifica; nome: string }[] = [
  { id: 'tea', nome: 'Transtorno do Espectro Autista (TEA)' },
  { id: 'tdah', nome: 'TDAH (Transtorno de Déficit de Atenção e Hiperatividade)' },
  { id: 'deficiencia_intelectual', nome: 'Deficiência Intelectual' },
  { id: 'deficiencia_fisica', nome: 'Deficiência Física/Motora' },
  { id: 'deficiencia_visual', nome: 'Deficiência Visual (baixa visão ou cegueira)' },
  { id: 'deficiencia_auditiva', nome: 'Deficiência Auditiva/Surdez' },
  { id: 'altas_habilidades', nome: 'Altas Habilidades/Superdotação' },
  { id: 'transtorno_aprendizagem', nome: 'Transtorno Específico de Aprendizagem (dislexia, discalculia etc.)' },
  { id: 'outra', nome: 'Outra necessidade específica' },
]

export interface NecessidadeAluno {
  tag: TagNecessidadeEspecifica
  observacao?: string
}

export interface PerfilTurma {
  etapa: EtapaEnsino
  componenteId: string
  anoOuSerie: string
  quantidadeAlunos?: number
  turmaAdulta: boolean
  necessidades: NecessidadeAluno[]
  observacoesGerais?: string
}

export interface ContextoAula {
  tema: string
  duracaoMinutos: number
  recursosDisponiveis: string[]
}

export interface ConteudoPlano {
  objetivosAprendizagem: string[]
  competenciasGeraisRelacionadas: number[]
  metodologia: string
  introducao: string
  desenvolvimento: string
  fechamento: string
  avaliacao: string
  adaptacoes: string[]
}

export interface PlanoDeAula {
  id: string
  criadoEm: string
  atualizadoEm: string
  titulo: string
  perfilTurma: PerfilTurma
  contexto: ContextoAula
  habilidadesSelecionadas: string[]
  conteudo: ConteudoPlano
}
