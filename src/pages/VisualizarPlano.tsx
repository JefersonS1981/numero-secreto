import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { obterPlano, excluirPlano, duplicarPlano } from '../lib/planosStore'
import { listarTodasHabilidades } from '../lib/habilidadesStore'
import { componentePorId } from '../data/bncc/componentes'
import { nomeEtapa, nomeNecessidade, textoCompetenciaGeral } from '../lib/labels'

export default function VisualizarPlano() {
  const { id } = useParams()
  const navigate = useNavigate()
  const plano = id ? obterPlano(id) : undefined

  const habilidades = useMemo(() => {
    if (!plano) return []
    const todas = listarTodasHabilidades()
    return plano.habilidadesSelecionadas
      .map((codigo) => todas.find((h) => h.codigo === codigo))
      .filter((h): h is NonNullable<typeof h> => Boolean(h))
  }, [plano])

  if (!plano) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 mb-4">Plano não encontrado.</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          Voltar para meus planos
        </Link>
      </div>
    )
  }

  const componente = componentePorId(plano.perfilTurma.componenteId)

  function handleExcluir() {
    if (!plano) return
    if (!confirm('Excluir este plano de aula? Esta ação não pode ser desfeita.')) return
    excluirPlano(plano.id)
    navigate('/')
  }

  function handleDuplicar() {
    if (!plano) return
    const copia = duplicarPlano(plano.id)
    if (copia) navigate(`/plano/${copia.id}`)
  }

  return (
    <div>
      <div className="no-print flex items-center justify-between mb-4">
        <Link to="/" className="text-sm text-indigo-600 hover:underline">
          ← Voltar
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <button type="button" onClick={() => window.print()} className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50">
            Imprimir / Exportar PDF
          </button>
          <Link to={`/plano/${plano.id}/editar`} className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50">
            Editar
          </Link>
          <button type="button" onClick={handleDuplicar} className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50">
            Duplicar
          </button>
          <button type="button" onClick={handleExcluir} className="px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50">
            Excluir
          </button>
        </div>
      </div>

      <article className="print-area bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-slate-800">{plano.titulo}</h1>
          <p className="text-sm text-slate-500 mt-1">
            {nomeEtapa(plano.perfilTurma.etapa)} · {componente?.nome ?? plano.perfilTurma.componenteId} ·{' '}
            {plano.perfilTurma.anoOuSerie}
            {plano.perfilTurma.quantidadeAlunos ? ` · ${plano.perfilTurma.quantidadeAlunos} alunos` : ''}
            {plano.perfilTurma.turmaAdulta ? ' · Turma adulta/EJA' : ''}
          </p>
          <p className="text-sm text-slate-500">
            Tema: {plano.contexto.tema || '—'} · Duração: {plano.contexto.duracaoMinutos} min
            {plano.contexto.recursosDisponiveis.length ? ` · Recursos: ${plano.contexto.recursosDisponiveis.join(', ')}` : ''}
          </p>
        </header>

        {plano.perfilTurma.necessidades.length > 0 && (
          <section>
            <h2 className="font-medium text-slate-800 mb-1">Necessidades específicas consideradas</h2>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-0.5">
              {plano.perfilTurma.necessidades.map((n) => (
                <li key={n.tag}>
                  {nomeNecessidade(n.tag)}
                  {n.observacao ? ` — ${n.observacao}` : ''}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="font-medium text-slate-800 mb-1">Objetivos de aprendizagem</h2>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-0.5">
            {plano.conteudo.objetivosAprendizagem.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </section>

        {habilidades.length > 0 && (
          <section>
            <h2 className="font-medium text-slate-800 mb-1">Habilidades BNCC relacionadas</h2>
            <ul className="text-sm text-slate-700 space-y-1">
              {habilidades.map((h) => (
                <li key={h.codigo}>
                  <span className="font-mono text-xs text-slate-500 mr-2">{h.codigo}</span>
                  {h.descricao}
                </li>
              ))}
            </ul>
          </section>
        )}

        {plano.conteudo.competenciasGeraisRelacionadas.length > 0 && (
          <section>
            <h2 className="font-medium text-slate-800 mb-1">Competências gerais da BNCC</h2>
            <ul className="text-sm text-slate-700 space-y-1">
              {plano.conteudo.competenciasGeraisRelacionadas.map((n) => (
                <li key={n}>{textoCompetenciaGeral(n)}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="font-medium text-slate-800 mb-1">Metodologia</h2>
          <p className="text-sm text-slate-700 whitespace-pre-line">{plano.conteudo.metodologia}</p>
        </section>

        <section>
          <h2 className="font-medium text-slate-800 mb-1">Desenvolvimento da aula</h2>
          <div className="text-sm text-slate-700 space-y-2">
            <p>
              <strong>Introdução:</strong> {plano.conteudo.introducao}
            </p>
            <p>
              <strong>Desenvolvimento:</strong> {plano.conteudo.desenvolvimento}
            </p>
            <p>
              <strong>Fechamento:</strong> {plano.conteudo.fechamento}
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-medium text-slate-800 mb-1">Avaliação</h2>
          <p className="text-sm text-slate-700 whitespace-pre-line">{plano.conteudo.avaliacao}</p>
        </section>

        {plano.conteudo.adaptacoes.length > 0 && (
          <section>
            <h2 className="font-medium text-slate-800 mb-1">Adaptações para necessidades específicas</h2>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-0.5">
              {plano.conteudo.adaptacoes.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  )
}
