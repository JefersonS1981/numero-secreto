import type { PerfilTurma, TagNecessidadeEspecifica } from '../types'
import { ETAPAS, NECESSIDADES_ESPECIFICAS } from '../types'
import { componentesPorEtapa } from '../data/bncc/componentes'

interface Props {
  perfil: PerfilTurma
  onChange: (perfil: PerfilTurma) => void
}

export default function PerfilTurmaForm({ perfil, onChange }: Props) {
  const componentesDisponiveis = componentesPorEtapa(perfil.etapa)

  function atualizar<K extends keyof PerfilTurma>(campo: K, valor: PerfilTurma[K]) {
    onChange({ ...perfil, [campo]: valor })
  }

  function toggleNecessidade(tag: TagNecessidadeEspecifica) {
    const existe = perfil.necessidades.some((n) => n.tag === tag)
    if (existe) {
      atualizar('necessidades', perfil.necessidades.filter((n) => n.tag !== tag))
    } else {
      atualizar('necessidades', [...perfil.necessidades, { tag, observacao: '' }])
    }
  }

  function atualizarObservacao(tag: TagNecessidadeEspecifica, observacao: string) {
    atualizar(
      'necessidades',
      perfil.necessidades.map((n) => (n.tag === tag ? { ...n, observacao } : n)),
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Etapa de ensino</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={perfil.etapa}
          onChange={(e) => {
            const novaEtapa = e.target.value as PerfilTurma['etapa']
            const componentes = componentesPorEtapa(novaEtapa)
            onChange({
              ...perfil,
              etapa: novaEtapa,
              componenteId: componentes[0]?.id ?? '',
              turmaAdulta: novaEtapa === 'eja' ? true : perfil.turmaAdulta,
            })
          }}
        >
          {ETAPAS.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {perfil.etapa === 'educacao_infantil' ? 'Campo de experiência' : 'Componente curricular'}
        </label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={perfil.componenteId}
          onChange={(e) => atualizar('componenteId', e.target.value)}
        >
          {componentesDisponiveis.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ano/série ou turma</label>
          <input
            type="text"
            placeholder="Ex.: 5º ano, 1ª série, turma noturna..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={perfil.anoOuSerie}
            onChange={(e) => atualizar('anoOuSerie', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nº de alunos (opcional)</label>
          <input
            type="number"
            min={1}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={perfil.quantidadeAlunos ?? ''}
            onChange={(e) => atualizar('quantidadeAlunos', e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={perfil.turmaAdulta}
          onChange={(e) => atualizar('turmaAdulta', e.target.checked)}
        />
        Esta é uma turma de perfil adulto (EJA, curso técnico/idiomas para adultos etc.)
      </label>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Alunos com necessidades específicas nesta turma (opcional)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {NECESSIDADES_ESPECIFICAS.map((n) => {
            const selecionada = perfil.necessidades.some((sel) => sel.tag === n.id)
            return (
              <label
                key={n.id}
                className={`flex items-start gap-2 text-sm border rounded-md px-3 py-2 cursor-pointer ${
                  selecionada ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200'
                }`}
              >
                <input type="checkbox" checked={selecionada} onChange={() => toggleNecessidade(n.id)} className="mt-0.5" />
                {n.nome}
              </label>
            )
          })}
        </div>
        {perfil.necessidades.length > 0 && (
          <div className="mt-3 space-y-2">
            {perfil.necessidades.map((n) => (
              <div key={n.tag}>
                <label className="block text-xs text-slate-500 mb-1">
                  Observações específicas — {NECESSIDADES_ESPECIFICAS.find((x) => x.id === n.tag)?.nome}
                </label>
                <input
                  type="text"
                  placeholder="Ex.: sensibilidade a ruído, usa comunicação alternativa, etc."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={n.observacao ?? ''}
                  onChange={(e) => atualizarObservacao(n.tag, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Observações gerais sobre a turma (opcional)</label>
        <textarea
          rows={2}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={perfil.observacoesGerais ?? ''}
          onChange={(e) => atualizar('observacoesGerais', e.target.value)}
        />
      </div>
    </div>
  )
}
