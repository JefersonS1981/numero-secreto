import type { TagNecessidadeEspecifica } from '../types'

// Sugestões gerais de adaptação/acessibilidade por necessidade específica.
// São diretrizes de referência (Desenho Universal para a Aprendizagem) para
// o professor revisar e ajustar ao contexto real do(a) estudante — não
// substituem o plano educacional individualizado (PEI) nem a orientação do
// AEE (Atendimento Educacional Especializado) da escola.
export const SUGESTOES_ADAPTACAO: Record<TagNecessidadeEspecifica, string[]> = {
  tea: [
    'Antecipar a rotina da aula com apoio visual (quadro de rotina, pictogramas) para reduzir imprevisibilidade.',
    'Dar instruções curtas, objetivas e uma de cada vez, evitando linguagem figurada sem explicação.',
    'Prever um espaço/momento de autorregulação caso o(a) estudante precise de uma pausa sensorial.',
  ],
  tdah: [
    'Dividir a aula em blocos curtos de atividade com pausas ativas entre eles.',
    'Usar apoios visuais de tempo (cronômetro visível) e checklists de etapas da tarefa.',
    'Priorizar poucas instruções por vez e checar a compreensão antes de avançar.',
  ],
  deficiencia_intelectual: [
    'Simplificar o vocabulário das instruções e usar exemplos concretos e do cotidiano do estudante.',
    'Dividir a tarefa em passos menores, com verificação de compreensão a cada etapa.',
    'Oferecer materiais concretos/manipuláveis sempre que o conteúdo permitir.',
  ],
  deficiencia_fisica: [
    'Garantir acessibilidade física do espaço e dos materiais (altura de mesa, alcance de objetos).',
    'Adaptar a forma de registro/resposta (oral, digital, com apoio de terceiros) quando a escrita manual for barreira.',
    'Prever tempo adicional para atividades que exijam deslocamento ou manipulação de materiais.',
  ],
  deficiencia_visual: [
    'Descrever verbalmente imagens, gráficos e informações apresentadas visualmente.',
    'Disponibilizar materiais em formato acessível (fonte ampliada, braile ou áudio, conforme o caso).',
    'Privilegiar recursos táteis/sonoros para conceitos que dependem de percepção visual.',
  ],
  deficiencia_auditiva: [
    'Garantir apoio de intérprete de Libras ou legendas quando houver conteúdo em áudio/vídeo.',
    'Falar de frente para o(a) estudante, com boa iluminação no rosto, e apoiar a fala com material escrito/visual.',
    'Checar a compreensão por meio de registros escritos ou visuais, não apenas orais.',
  ],
  altas_habilidades: [
    'Propor desafios de aprofundamento ou investigação adicional sobre o tema para além do objetivo mínimo da aula.',
    'Permitir produtos finais mais abertos, que possibilitem exploração além do escopo padrão da atividade.',
    'Considerar o estudante como monitor/tutor de colegas em momentos de trabalho colaborativo, quando apropriado.',
  ],
  transtorno_aprendizagem: [
    'Oferecer tempo adicional e formas alternativas de registro (oral, digital) quando a leitura/escrita for barreira.',
    'Usar apoios visuais e multissensoriais para reforçar conceitos-chave.',
    'Fracionar a tarefa e verificar a compreensão em etapas menores.',
  ],
  outra: [
    'Descrever, no campo de observações, a necessidade específica do(a) estudante para revisar esta seção com mais precisão.',
    'Consultar a equipe de Atendimento Educacional Especializado (AEE) da escola para orientações específicas.',
  ],
}
