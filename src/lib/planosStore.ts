import type { PlanoDeAula } from '../types'

const STORAGE_KEY = 'plano-certo:planos:v1'

function lerPlanos(): PlanoDeAula[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const dados = JSON.parse(raw)
    return Array.isArray(dados) ? dados : []
  } catch {
    return []
  }
}

function salvarTodos(planos: PlanoDeAula[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(planos))
}

export function listarPlanos(): PlanoDeAula[] {
  return lerPlanos().sort((a, b) => (a.atualizadoEm < b.atualizadoEm ? 1 : -1))
}

export function obterPlano(id: string): PlanoDeAula | undefined {
  return lerPlanos().find((p) => p.id === id)
}

export function salvarPlano(plano: PlanoDeAula) {
  const planos = lerPlanos()
  const idx = planos.findIndex((p) => p.id === plano.id)
  if (idx >= 0) {
    planos[idx] = plano
  } else {
    planos.push(plano)
  }
  salvarTodos(planos)
}

export function excluirPlano(id: string) {
  salvarTodos(lerPlanos().filter((p) => p.id !== id))
}

export function duplicarPlano(id: string): PlanoDeAula | undefined {
  const original = obterPlano(id)
  if (!original) return undefined
  const agora = new Date().toISOString()
  const copia: PlanoDeAula = {
    ...original,
    id: crypto.randomUUID(),
    titulo: `${original.titulo} (cópia)`,
    criadoEm: agora,
    atualizadoEm: agora,
  }
  salvarPlano(copia)
  return copia
}
