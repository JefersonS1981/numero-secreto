import type { ComponenteCurricular } from '../../types'

// Estrutura curricular da BNCC: Campos de Experiência (Educação Infantil) e
// Componentes Curriculares por Área de Conhecimento (Fundamental e Médio),
// incluindo Computação como área/componente transversal (BNCC Computação, 2022).
export const COMPONENTES: ComponenteCurricular[] = [
  // Educação Infantil — Campos de Experiência
  { id: 'ce_eu_outro_nos', nome: 'O eu, o outro e o nós', area: 'campos_experiencia', etapas: ['educacao_infantil'] },
  { id: 'ce_corpo_gestos_movimentos', nome: 'Corpo, gestos e movimentos', area: 'campos_experiencia', etapas: ['educacao_infantil'] },
  { id: 'ce_tracos_sons_cores_formas', nome: 'Traços, sons, cores e formas', area: 'campos_experiencia', etapas: ['educacao_infantil'] },
  { id: 'ce_escuta_fala_pensamento_imaginacao', nome: 'Escuta, fala, pensamento e imaginação', area: 'campos_experiencia', etapas: ['educacao_infantil'] },
  { id: 'ce_espacos_tempos_quantidades', nome: 'Espaços, tempos, quantidades, relações e transformações', area: 'campos_experiencia', etapas: ['educacao_infantil'] },

  // Linguagens
  { id: 'lingua_portuguesa', nome: 'Língua Portuguesa', area: 'linguagens', etapas: ['fundamental1', 'fundamental2', 'medio', 'eja'] },
  { id: 'arte', nome: 'Arte', area: 'linguagens', etapas: ['fundamental1', 'fundamental2', 'medio', 'eja'] },
  { id: 'educacao_fisica', nome: 'Educação Física', area: 'linguagens', etapas: ['fundamental1', 'fundamental2', 'medio', 'eja'] },
  { id: 'lingua_inglesa', nome: 'Língua Inglesa', area: 'linguagens', etapas: ['fundamental2', 'medio', 'eja'] },

  // Matemática
  { id: 'matematica', nome: 'Matemática', area: 'matematica', etapas: ['fundamental1', 'fundamental2', 'medio', 'eja'] },

  // Ciências da Natureza
  { id: 'ciencias', nome: 'Ciências', area: 'ciencias_natureza', etapas: ['fundamental1', 'fundamental2', 'eja'] },
  { id: 'biologia', nome: 'Biologia', area: 'ciencias_natureza', etapas: ['medio', 'eja'] },
  { id: 'fisica', nome: 'Física', area: 'ciencias_natureza', etapas: ['medio', 'eja'] },
  { id: 'quimica', nome: 'Química', area: 'ciencias_natureza', etapas: ['medio', 'eja'] },

  // Ciências Humanas (e Sociais Aplicadas)
  { id: 'historia', nome: 'História', area: 'ciencias_humanas', etapas: ['fundamental1', 'fundamental2', 'medio', 'eja'] },
  { id: 'geografia', nome: 'Geografia', area: 'ciencias_humanas', etapas: ['fundamental1', 'fundamental2', 'medio', 'eja'] },
  { id: 'sociologia', nome: 'Sociologia', area: 'ciencias_humanas', etapas: ['medio', 'eja'] },
  { id: 'filosofia', nome: 'Filosofia', area: 'ciencias_humanas', etapas: ['medio', 'eja'] },

  // Ensino Religioso
  { id: 'ensino_religioso', nome: 'Ensino Religioso', area: 'ensino_religioso', etapas: ['fundamental1', 'fundamental2'] },

  // Computação (BNCC Computação, 2022) — pode ser trabalhada de forma transversal
  // ou como componente/eletiva, conforme o currículo da rede de ensino.
  { id: 'computacao', nome: 'Computação', area: 'computacao', etapas: ['fundamental1', 'fundamental2', 'medio', 'eja'] },
]

export function componentesPorEtapa(etapa: ComponenteCurricular['etapas'][number]) {
  return COMPONENTES.filter((c) => c.etapas.includes(etapa))
}

export function componentePorId(id: string) {
  return COMPONENTES.find((c) => c.id === id)
}
