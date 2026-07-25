import { useState } from 'react'
import type { ContextoAula } from '../types'

interface Props {
  contexto: ContextoAula
  onChange: (contexto: ContextoAula) => void
}

export default function ContextoAulaForm({ contexto, onChange }: Props) {
  const [novoRecurso, setNovoRecurso] = useState('')

  function atualizar<K extends keyof ContextoAula>(campo: K, valor: ContextoAula[K]) {
    onChange({ ...contexto, [campo]: valor })
  }

  function adicionarRecurso() {
    const valor = novoRecurso.trim()
    if (!valor) return
    atualizar('recursosDisponiveis', [...contexto.recursosDisponiveis, valor])
    setNovoRecurso('')
  }

  function removerRecurso(idx: number) {
    atualizar(
      'recursosDisponiveis',
      contexto.recursosDisponiveis.filter((_, i) => i !== idx),
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Tema/conteúdo da aula</label>
        <input
          type="text"
          placeholder="Ex.: Frações equivalentes, Revolução Industrial, Redes sociais e privacidade..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={contexto.tema}
          onChange={(e) => atualizar('tema', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Duração da aula (minutos)</label>
        <input
          type="number"
          min={10}
          step={5}
          className="w-40 border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={contexto.duracaoMinutos}
          onChange={(e) => atualizar('duracaoMinutos', Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Recursos disponíveis (opcional)</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Ex.: projetor, computadores, material impresso..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={novoRecurso}
            onChange={(e) => setNovoRecurso(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                adicionarRecurso()
              }
            }}
          />
          <button
            type="button"
            onClick={adicionarRecurso}
            className="px-3 py-2 rounded-md bg-slate-100 text-slate-700 text-sm hover:bg-slate-200"
          >
            Adicionar
          </button>
        </div>
        {contexto.recursosDisponiveis.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {contexto.recursosDisponiveis.map((r, idx) => (
              <li key={idx} className="flex items-center gap-1 bg-slate-100 rounded-full px-3 py-1 text-xs text-slate-700">
                {r}
                <button type="button" onClick={() => removerRecurso(idx)} className="text-slate-400 hover:text-red-500">
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
