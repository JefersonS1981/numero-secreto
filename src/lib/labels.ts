import { ETAPAS, NECESSIDADES_ESPECIFICAS, EIXOS_COMPUTACAO } from '../types'
import { COMPETENCIAS_GERAIS } from '../data/bncc/competenciasGerais'

export function nomeEtapa(etapa: string) {
  return ETAPAS.find((e) => e.id === etapa)?.nome ?? etapa
}

export function nomeNecessidade(tag: string) {
  return NECESSIDADES_ESPECIFICAS.find((n) => n.id === tag)?.nome ?? tag
}

export function nomeEixoComputacao(eixo: string) {
  return EIXOS_COMPUTACAO.find((e) => e.id === eixo)?.nome ?? eixo
}

export function textoCompetenciaGeral(numero: number) {
  return COMPETENCIAS_GERAIS.find((c) => c.numero === numero)?.texto ?? `Competência ${numero}`
}
