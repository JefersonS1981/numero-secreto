import { useMemo, useState } from 'react'
import type { EtapaEnsino, HabilidadeBNCC } from '../types'
import { listarTodasHabilidades } from '../lib/habilidadesStore'
import { nomeEixoComputacao } from '../lib/labels'

interface Props {
  etapa: EtapaEnsino
  componenteId: string
  selecionadas: string[]
  onChange: (codigos: string[]) => void
}

export default function SelecionarHabilidades({ etapa, componenteId, selecionadas, onChange }: Props) {
  const [busca, setBusca] = useState('')

  const habilidades = useMemo(() => {
    const todas = listarTodasHabilidades()
    return todas.filter((h) => h.etapa === etapa && h.componenteId === componenteId)
  }, [etapa, componenteId])

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    if (!termo) return habilidades
    return habilidades.filter(
      (h) => h.descricao.toLowerCase().includes(termo) || h.codigo.toLowerCase().includes(termo),
    )
  }, [habilidades, busca])

  function toggle(codigo: string) {
    if (selecionadas.includes(codigo)) {
      onChange(selecionadas.filter((c) => c !== codigo))
    } else {
      onChange([...selecionadas, codigo])
    }
  }

  return (
    <div>
      <p className="text-sm text-slate-600 mb-3">
        Selecione as habilidades da BNCC que esta aula deve desenvolver. Você pode seguir sem selecionar
        nenhuma e escrever os objetivos livremente na etapa de revisão.
      </p>

      <input
        type="text"
        placeholder="Buscar por código ou palavra-chave..."
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-3"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {habilidades.length === 0 && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-md px-3 py-2">
          Nenhuma habilidade cadastrada para esta etapa/componente ainda. Importe o dataset oficial da BNCC
          na página "Importar BNCC" ou continue e descreva os objetivos manualmente na revisão final.
        </p>
      )}

      <ul className="space-y-2 max-h-96 overflow-y-auto">
        {filtradas.map((h: HabilidadeBNCC) => {
          const marcada = selecionadas.includes(h.codigo)
          return (
            <li key={h.codigo}>
              <label
                className={`flex items-start gap-3 border rounded-md px-3 py-2 cursor-pointer text-sm ${
                  marcada ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200'
                }`}
              >
                <input type="checkbox" checked={marcada} onChange={() => toggle(h.codigo)} className="mt-1" />
                <span>
                  <span className="font-mono text-xs text-slate-500 mr-2">{h.codigo}</span>
                  {h.eixoComputacao && (
                    <span className="inline-block text-[10px] uppercase tracking-wide bg-slate-200 text-slate-600 rounded px-1.5 py-0.5 mr-2">
                      {nomeEixoComputacao(h.eixoComputacao)}
                    </span>
                  )}
                  {h.origem === 'exemplo' && (
                    <span className="inline-block text-[10px] uppercase tracking-wide bg-amber-100 text-amber-700 rounded px-1.5 py-0.5 mr-2">
                      exemplo ilustrativo
                    </span>
                  )}
                  {h.anoOuFaixa} — {h.descricao}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
