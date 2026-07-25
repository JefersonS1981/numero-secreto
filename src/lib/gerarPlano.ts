import type { ConteudoPlano, ContextoAula, HabilidadeBNCC, PerfilTurma } from '../types'
import { SUGESTOES_ADAPTACAO } from './adaptacoes'
import { NECESSIDADES_ESPECIFICAS } from '../types'

function nomeNecessidade(tag: string) {
  return NECESSIDADES_ESPECIFICAS.find((n) => n.id === tag)?.nome ?? tag
}

function metodologiaSugerida(perfil: PerfilTurma): string {
  const partes: string[] = []

  if (perfil.turmaAdulta) {
    partes.push(
      'Turma de perfil adulto/EJA: partir da experiência de vida e do repertório prévio dos estudantes, relacionando o conteúdo a situações reais do trabalho e do cotidiano. Evitar infantilização de materiais e de linguagem; valorizar a autonomia e o protagonismo do estudante na construção do conhecimento (abordagem andragógica).',
    )
  } else {
    partes.push(
      'Adotar metodologia ativa e dialogada, alternando momentos de explicação, prática guiada e prática autônoma, respeitando o ritmo da turma.',
    )
  }

  if (perfil.necessidades.length > 0) {
    partes.push(
      'Prever, desde o planejamento, as adaptações necessárias para os(as) estudantes com necessidades específicas indicadas (detalhadas na seção de adaptações), garantindo participação plena nas atividades propostas.',
    )
  }

  return partes.join(' ')
}

function desenvolvimentoAula(contexto: ContextoAula, habilidades: HabilidadeBNCC[]): {
  introducao: string
  desenvolvimento: string
  fechamento: string
} {
  const duracao = contexto.duracaoMinutos || 50
  const introMin = Math.max(5, Math.round(duracao * 0.15))
  const desenvMin = Math.max(10, Math.round(duracao * 0.65))
  const fechMin = Math.max(5, duracao - introMin - desenvMin)

  const temaTexto = contexto.tema ? `sobre "${contexto.tema}"` : 'proposto'
  const recursos = contexto.recursosDisponiveis.length
    ? contexto.recursosDisponiveis.join(', ')
    : 'quadro, materiais impressos e recursos disponíveis em sala'

  const habilidadesTexto = habilidades.length
    ? habilidades.map((h) => `"${h.descricao}"`).join('; ')
    : 'os objetivos de aprendizagem definidos para esta aula'

  return {
    introducao: `(${introMin} min) Iniciar retomando conhecimentos prévios da turma sobre o tema ${temaTexto}, com uma pergunta disparadora ou situação-problema que conecte o conteúdo à realidade dos estudantes.`,
    desenvolvimento: `(${desenvMin} min) Explorar o conteúdo por meio de explicação dialogada e atividade prática, utilizando ${recursos}, com o objetivo de desenvolver ${habilidadesTexto}. Circular pela sala oferecendo apoio individualizado, especialmente aos estudantes que necessitam de adaptações.`,
    fechamento: `(${fechMin} min) Sistematizar coletivamente o que foi aprendido, retomando os pontos-chave, e realizar uma verificação rápida de compreensão (oral, escrita ou por meio de atividade curta).`,
  }
}

function avaliacaoSugerida(perfil: PerfilTurma): string {
  const base =
    'Avaliação formativa e processual, observando a participação, o engajamento nas atividades propostas e o desempenho na tarefa de verificação de compreensão ao final da aula.'
  if (perfil.turmaAdulta) {
    return `${base} Para turmas de EJA/adultos, valorizar também a aplicação prática do conteúdo em situações do cotidiano e do mundo do trabalho relatadas pelos próprios estudantes.`
  }
  return base
}

function adaptacoesSugeridas(perfil: PerfilTurma): string[] {
  const adaptacoes: string[] = []
  for (const necessidade of perfil.necessidades) {
    const sugestoes = SUGESTOES_ADAPTACAO[necessidade.tag] ?? []
    const titulo = nomeNecessidade(necessidade.tag)
    for (const sugestao of sugestoes) {
      adaptacoes.push(`[${titulo}] ${sugestao}`)
    }
    if (necessidade.observacao) {
      adaptacoes.push(`[${titulo}] Observação do professor: ${necessidade.observacao}`)
    }
  }
  return adaptacoes
}

export function gerarConteudoPlano(
  perfil: PerfilTurma,
  contexto: ContextoAula,
  habilidadesSelecionadas: HabilidadeBNCC[],
): ConteudoPlano {
  const objetivosAprendizagem = habilidadesSelecionadas.length
    ? habilidadesSelecionadas.map((h) => h.descricao)
    : [`Desenvolver a compreensão dos estudantes sobre: ${contexto.tema || '(defina o tema da aula)'}`]

  const competenciasGeraisRelacionadas = Array.from(
    new Set(habilidadesSelecionadas.flatMap((h) => h.competenciasGerais ?? [])),
  ).sort((a, b) => a - b)

  const { introducao, desenvolvimento, fechamento } = desenvolvimentoAula(contexto, habilidadesSelecionadas)

  return {
    objetivosAprendizagem,
    competenciasGeraisRelacionadas,
    metodologia: metodologiaSugerida(perfil),
    introducao,
    desenvolvimento,
    fechamento,
    avaliacao: avaliacaoSugerida(perfil),
    adaptacoes: adaptacoesSugeridas(perfil),
  }
}
