import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ConteudoPlano, ContextoAula, PerfilTurma, PlanoDeAula } from '../types'
import { obterPlano, salvarPlano } from '../lib/planosStore'
import { listarTodasHabilidades } from '../lib/habilidadesStore'
import { gerarConteudoPlano } from '../lib/gerarPlano'
import { componentePorId } from '../data/bncc/componentes'
import PerfilTurmaForm from './PerfilTurmaForm'
import ContextoAulaForm from './ContextoAulaForm'
import SelecionarHabilidades from './SelecionarHabilidades'
import RevisarPlano from './RevisarPlano'

const PERFIL_INICIAL: PerfilTurma = {
  etapa: 'fundamental1',
  componenteId: 'lingua_portuguesa',
  anoOuSerie: '',
  quantidadeAlunos: undefined,
  turmaAdulta: false,
  necessidades: [],
  observacoesGerais: '',
}

const CONTEXTO_INICIAL: ContextoAula = {
  tema: '',
  duracaoMinutos: 50,
  recursosDisponiveis: [],
}

const CONTEUDO_VAZIO: ConteudoPlano = {
  objetivosAprendizagem: [],
  competenciasGeraisRelacionadas: [],
  metodologia: '',
  introducao: '',
  desenvolvimento: '',
  fechamento: '',
  avaliacao: '',
  adaptacoes: [],
}

const ETAPAS_WIZARD = ['Turma', 'Aula', 'Habilidades BNCC', 'Revisão final']

export default function NovoPlano() {
  const { id } = useParams()
  const navigate = useNavigate()
  const modoEdicao = Boolean(id)

  const [step, setStep] = useState(0)
  const [planoId, setPlanoId] = useState<string>(() => crypto.randomUUID())
  const [criadoEm, setCriadoEm] = useState<string>(() => new Date().toISOString())
  const [titulo, setTitulo] = useState('')
  const [perfil, setPerfil] = useState<PerfilTurma>(PERFIL_INICIAL)
  const [contexto, setContexto] = useState<ContextoAula>(CONTEXTO_INICIAL)
  const [habilidadesSelecionadas, setHabilidadesSelecionadas] = useState<string[]>([])
  const [conteudo, setConteudo] = useState<ConteudoPlano>(CONTEUDO_VAZIO)
  const [conteudoGerado, setConteudoGerado] = useState(false)

  useEffect(() => {
    if (id) {
      const existente = obterPlano(id)
      if (existente) {
        setPlanoId(existente.id)
        setCriadoEm(existente.criadoEm)
        setTitulo(existente.titulo)
        setPerfil(existente.perfilTurma)
        setContexto(existente.contexto)
        setHabilidadesSelecionadas(existente.habilidadesSelecionadas)
        setConteudo(existente.conteudo)
        setConteudoGerado(true)
      }
    }
  }, [id])

  const todasHabilidades = useMemo(() => listarTodasHabilidades(), [])

  function irParaRevisao() {
    const selecionadas = todasHabilidades.filter((h) => habilidadesSelecionadas.includes(h.codigo))
    const gerado = gerarConteudoPlano(perfil, contexto, selecionadas)
    setConteudo(gerado)
    setConteudoGerado(true)
    if (!titulo) {
      const componente = componentePorId(perfil.componenteId)
      setTitulo(`${componente?.nome ?? 'Aula'} — ${contexto.tema || perfil.anoOuSerie}`)
    }
    setStep(3)
  }

  function regenerar() {
    const selecionadas = todasHabilidades.filter((h) => habilidadesSelecionadas.includes(h.codigo))
    setConteudo(gerarConteudoPlano(perfil, contexto, selecionadas))
  }

  function salvar() {
    const agora = new Date().toISOString()
    const plano: PlanoDeAula = {
      id: planoId,
      criadoEm,
      atualizadoEm: agora,
      titulo: titulo || 'Plano de aula sem título',
      perfilTurma: perfil,
      contexto,
      habilidadesSelecionadas,
      conteudo,
    }
    salvarPlano(plano)
    navigate(`/plano/${plano.id}`)
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-800 mb-1">
        {modoEdicao ? 'Editar plano de aula' : 'Novo plano de aula'}
      </h1>
      <p className="text-sm text-slate-500 mb-5">
        Passo {step + 1} de {ETAPAS_WIZARD.length}: {ETAPAS_WIZARD[step]}
      </p>

      <ol className="flex items-center gap-2 mb-6 text-xs">
        {ETAPAS_WIZARD.map((nome, idx) => (
          <li
            key={nome}
            className={`px-2.5 py-1 rounded-full border ${
              idx === step
                ? 'bg-indigo-600 text-white border-indigo-600'
                : idx < step
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'border-gray-200 text-slate-400'
            }`}
          >
            {idx + 1}. {nome}
          </li>
        ))}
      </ol>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        {step === 0 && <PerfilTurmaForm perfil={perfil} onChange={setPerfil} />}
        {step === 1 && <ContextoAulaForm contexto={contexto} onChange={setContexto} />}
        {step === 2 && (
          <SelecionarHabilidades
            etapa={perfil.etapa}
            componenteId={perfil.componenteId}
            selecionadas={habilidadesSelecionadas}
            onChange={setHabilidadesSelecionadas}
          />
        )}
        {step === 3 && (
          <RevisarPlano titulo={titulo} onTituloChange={setTitulo} conteudo={conteudo} onConteudoChange={setConteudo} />
        )}
      </div>

      <div className="flex items-center justify-between mt-5">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="px-4 py-2 rounded-md text-sm text-slate-600 border border-gray-300 disabled:opacity-40"
        >
          Voltar
        </button>

        <div className="flex items-center gap-2">
          {step === 3 && conteudoGerado && (
            <button
              type="button"
              onClick={regenerar}
              className="px-4 py-2 rounded-md text-sm text-slate-600 border border-gray-300 hover:bg-gray-50"
            >
              Gerar novamente
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="px-4 py-2 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Continuar
            </button>
          )}
          {step === 2 && (
            <button
              type="button"
              onClick={irParaRevisao}
              className="px-4 py-2 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Gerar plano de aula
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={salvar}
              className="px-4 py-2 rounded-md text-sm bg-green-600 text-white hover:bg-green-700"
            >
              Salvar plano
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
