import { useRef, useState } from 'react'
import {
  importarHabilidadesDeJSON,
  limparHabilidadesImportadas,
  temHabilidadesImportadas,
} from '../lib/habilidadesStore'

export default function ImportarBNCC() {
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null)
  const [temImportadas, setTemImportadas] = useState(temHabilidadesImportadas())
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const conteudo = await arquivo.text()
    const resultado = importarHabilidadesDeJSON(conteudo)
    if (resultado.sucesso) {
      setMensagem({ tipo: 'sucesso', texto: `${resultado.quantidade} habilidade(s) importada(s) com sucesso.` })
      setTemImportadas(true)
    } else {
      setMensagem({ tipo: 'erro', texto: resultado.erro ?? 'Falha ao importar arquivo.' })
    }
    if (inputRef.current) inputRef.current.value = ''
  }

  function handleLimpar() {
    if (!confirm('Remover as habilidades BNCC importadas? O app voltará a usar apenas os exemplos ilustrativos.')) return
    limparHabilidadesImportadas()
    setTemImportadas(false)
    setMensagem({ tipo: 'sucesso', texto: 'Habilidades importadas removidas.' })
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-slate-800 mb-2">Importar habilidades oficiais da BNCC</h1>
      <p className="text-slate-600 text-sm mb-4">
        Para manter fidelidade total ao texto oficial, o Plano Certo não tenta reproduzir de memória os
        milhares de códigos e descrições de habilidades da BNCC. Em vez disso, o app inclui apenas uma{' '}
        <strong>amostra ilustrativa</strong> (marcada como "exemplo") para você testar o funcionamento.
      </p>
      <p className="text-slate-600 text-sm mb-4">
        Para usar os dados oficiais completos, baixe a planilha/documento oficial da BNCC no site do
        Ministério da Educação (
        <span className="font-mono text-xs">basenacionalcomum.mec.gov.br</span>), converta para um arquivo
        JSON no formato abaixo e importe aqui. Os itens importados passam a aparecer no seletor de
        habilidades ao montar um plano de aula.
      </p>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h2 className="font-medium text-slate-800 mb-2 text-sm">Formato esperado (JSON)</h2>
        <pre className="bg-slate-50 border border-gray-100 rounded-md p-3 text-xs overflow-x-auto">
{`[
  {
    "codigo": "EF67LP08",
    "etapa": "fundamental2",
    "anoOuFaixa": "6º e 7º ano",
    "componenteId": "lingua_portuguesa",
    "unidadeTematica": "Leitura",
    "descricao": "Texto oficial da habilidade...",
    "competenciasGerais": [1, 4]
  }
]`}
        </pre>
        <p className="text-xs text-slate-500 mt-2">
          Campos obrigatórios: <code>codigo</code>, <code>etapa</code>, <code>anoOuFaixa</code>,{' '}
          <code>componenteId</code>, <code>descricao</code>. Valores de <code>etapa</code>:{' '}
          <code>educacao_infantil</code>, <code>fundamental1</code>, <code>fundamental2</code>,{' '}
          <code>medio</code>, <code>eja</code>. Consulte <code>src/data/bncc/componentes.ts</code> para os
          IDs de componente disponíveis.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <label className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium cursor-pointer hover:bg-indigo-700">
          Escolher arquivo JSON
          <input ref={inputRef} type="file" accept="application/json" onChange={handleArquivo} className="hidden" />
        </label>
        {temImportadas && (
          <button
            type="button"
            onClick={handleLimpar}
            className="px-4 py-2 rounded-md border border-gray-300 text-sm text-slate-600 hover:bg-gray-50"
          >
            Remover dados importados
          </button>
        )}
      </div>

      {mensagem && (
        <p
          className={`text-sm rounded-md px-3 py-2 ${
            mensagem.tipo === 'sucesso' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {mensagem.texto}
        </p>
      )}
    </div>
  )
}
