import type { ConteudoPlano } from '../types'
import { textoCompetenciaGeral } from '../lib/labels'
import { COMPETENCIAS_GERAIS } from '../data/bncc/competenciasGerais'

interface Props {
  titulo: string
  onTituloChange: (v: string) => void
  conteudo: ConteudoPlano
  onConteudoChange: (c: ConteudoPlano) => void
}

function linhas(texto: string[]) {
  return texto.join('\n')
}

function paraLista(texto: string) {
  return texto
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

export default function RevisarPlano({ titulo, onTituloChange, conteudo, onConteudoChange }: Props) {
  function atualizar<K extends keyof ConteudoPlano>(campo: K, valor: ConteudoPlano[K]) {
    onConteudoChange({ ...conteudo, [campo]: valor })
  }

  function toggleCompetencia(numero: number) {
    const atual = conteudo.competenciasGeraisRelacionadas
    if (atual.includes(numero)) {
      atualizar(
        'competenciasGeraisRelacionadas',
        atual.filter((n) => n !== numero),
      )
    } else {
      atualizar('competenciasGeraisRelacionadas', [...atual, numero].sort((a, b) => a - b))
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        O plano abaixo foi gerado automaticamente a partir das informações da turma e das habilidades
        selecionadas. Revise, ajuste o texto como preferir e salve quando estiver pronto.
      </p>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Título do plano</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={titulo}
          onChange={(e) => onTituloChange(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Objetivos de aprendizagem (um por linha)</label>
        <textarea
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={linhas(conteudo.objetivosAprendizagem)}
          onChange={(e) => atualizar('objetivosAprendizagem', paraLista(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Competências gerais da BNCC relacionadas</label>
        <div className="flex flex-wrap gap-2">
          {COMPETENCIAS_GERAIS.map((c) => {
            const marcada = conteudo.competenciasGeraisRelacionadas.includes(c.numero)
            return (
              <button
                type="button"
                key={c.numero}
                title={textoCompetenciaGeral(c.numero)}
                onClick={() => toggleCompetencia(c.numero)}
                className={`text-xs px-2.5 py-1 rounded-full border ${
                  marcada ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-slate-600'
                }`}
              >
                {c.numero}. {c.texto.split(':')[0]}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Metodologia</label>
        <textarea
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={conteudo.metodologia}
          onChange={(e) => atualizar('metodologia', e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Introdução</label>
          <textarea
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={conteudo.introducao}
            onChange={(e) => atualizar('introducao', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Desenvolvimento</label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={conteudo.desenvolvimento}
            onChange={(e) => atualizar('desenvolvimento', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Fechamento</label>
          <textarea
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={conteudo.fechamento}
            onChange={(e) => atualizar('fechamento', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Avaliação</label>
        <textarea
          rows={2}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={conteudo.avaliacao}
          onChange={(e) => atualizar('avaliacao', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Adaptações para necessidades específicas (uma por linha)
        </label>
        <textarea
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={linhas(conteudo.adaptacoes)}
          onChange={(e) => atualizar('adaptacoes', paraLista(e.target.value))}
        />
      </div>
    </div>
  )
}
