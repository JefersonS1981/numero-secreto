import type { HabilidadeBNCC } from '../types'
import { HABILIDADES_EXEMPLO } from '../data/bncc/habilidadesExemplo'

const STORAGE_KEY = 'plano-certo:habilidades-importadas:v1'

function lerImportadas(): HabilidadeBNCC[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const dados = JSON.parse(raw)
    if (!Array.isArray(dados)) return []
    return dados
  } catch {
    return []
  }
}

export function listarTodasHabilidades(): HabilidadeBNCC[] {
  return [...lerImportadas(), ...HABILIDADES_EXEMPLO]
}

export function temHabilidadesImportadas(): boolean {
  return lerImportadas().length > 0
}

export function limparHabilidadesImportadas() {
  localStorage.removeItem(STORAGE_KEY)
}

function validarHabilidade(item: unknown): item is HabilidadeBNCC {
  if (!item || typeof item !== 'object') return false
  const h = item as Record<string, unknown>
  return (
    typeof h.codigo === 'string' &&
    typeof h.etapa === 'string' &&
    typeof h.anoOuFaixa === 'string' &&
    typeof h.componenteId === 'string' &&
    typeof h.descricao === 'string'
  )
}

export interface ResultadoImportacao {
  sucesso: boolean
  quantidade: number
  erro?: string
}

// Aceita um JSON contendo um array de habilidades no formato HabilidadeBNCC.
// Pensado para receber a planilha oficial da BNCC (convertida para JSON)
// disponibilizada pelo MEC/movimento pela base, garantindo fidelidade ao
// texto oficial em vez de depender de amostras genéricas.
export function importarHabilidadesDeJSON(conteudo: string): ResultadoImportacao {
  let dados: unknown
  try {
    dados = JSON.parse(conteudo)
  } catch {
    return { sucesso: false, quantidade: 0, erro: 'Arquivo não é um JSON válido.' }
  }

  if (!Array.isArray(dados)) {
    return { sucesso: false, quantidade: 0, erro: 'O JSON deve conter uma lista (array) de habilidades.' }
  }

  const validas = dados.filter(validarHabilidade).map((h) => ({ ...h, origem: 'importado' as const }))

  if (validas.length === 0) {
    return {
      sucesso: false,
      quantidade: 0,
      erro: 'Nenhum item válido encontrado. Cada item precisa ter ao menos: codigo, etapa, anoOuFaixa, componenteId e descricao.',
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(validas))
  return { sucesso: true, quantidade: validas.length }
}
