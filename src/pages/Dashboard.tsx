import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { PlanoDeAula } from '../types'
import { duplicarPlano, excluirPlano, listarPlanos } from '../lib/planosStore'
import { ETAPAS } from '../types'
import { componentePorId } from '../data/bncc/componentes'

function nomeEtapa(etapa: string) {
  return ETAPAS.find((e) => e.id === etapa)?.nome ?? etapa
}

export default function Dashboard() {
  const [planos, setPlanos] = useState<PlanoDeAula[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setPlanos(listarPlanos())
  }, [])

  function handleExcluir(id: string) {
    if (!confirm('Excluir este plano de aula? Esta ação não pode ser desfeita.')) return
    excluirPlano(id)
    setPlanos(listarPlanos())
  }

  function handleDuplicar(id: string) {
    const copia = duplicarPlano(id)
    if (copia) {
      setPlanos(listarPlanos())
      navigate(`/plano/${copia.id}`)
    }
  }

  if (planos.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Bem-vindo(a) ao Plano Certo</h1>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          Monte planos de aula alinhados à BNCC em poucos passos: informe a turma, o tema e as
          necessidades específicas dos alunos, e revise o plano gerado automaticamente.
        </p>
        <Link
          to="/novo"
          className="inline-block px-5 py-2.5 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
        >
          Criar meu primeiro plano de aula
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-slate-800">Meus planos de aula</h1>
        <Link to="/novo" className="text-sm px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
          + Novo plano
        </Link>
      </div>
      <ul className="space-y-3">
        {planos.map((plano) => {
          const componente = componentePorId(plano.perfilTurma.componenteId)
          return (
            <li key={plano.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Link to={`/plano/${plano.id}`} className="font-medium text-slate-800 hover:text-indigo-700 truncate block">
                  {plano.titulo}
                </Link>
                <p className="text-xs text-slate-500 mt-1">
                  {nomeEtapa(plano.perfilTurma.etapa)} · {componente?.nome ?? plano.perfilTurma.componenteId} ·{' '}
                  {plano.perfilTurma.anoOuSerie}
                  {plano.perfilTurma.turmaAdulta ? ' · Turma adulta/EJA' : ''}
                  {plano.perfilTurma.necessidades.length > 0
                    ? ` · ${plano.perfilTurma.necessidades.length} adaptação(ões)`
                    : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-sm">
                <Link to={`/plano/${plano.id}`} className="px-2.5 py-1 rounded-md text-slate-600 hover:bg-gray-100">
                  Ver
                </Link>
                <Link to={`/plano/${plano.id}/editar`} className="px-2.5 py-1 rounded-md text-slate-600 hover:bg-gray-100">
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDuplicar(plano.id)}
                  className="px-2.5 py-1 rounded-md text-slate-600 hover:bg-gray-100"
                >
                  Duplicar
                </button>
                <button
                  type="button"
                  onClick={() => handleExcluir(plano.id)}
                  className="px-2.5 py-1 rounded-md text-red-600 hover:bg-red-50"
                >
                  Excluir
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
