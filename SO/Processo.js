class Processo{
  constructor( pid, nome, prioridade, quantum, dependencia, dado = 0){
    this.pid = pid
    this.nome = nome
    this.prioridade = prioridade
    this.quantum = quantum
    this.estado = 'P'
    this.dependencia = dependencia
    this.percentual = 0
    this.dado = dado 
  }
}
module.exports = Processo;