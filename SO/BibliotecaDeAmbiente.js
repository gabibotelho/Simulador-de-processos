var Nucleo = require('./Nucleo');

class BibliotecaDeAmbiente{
  constructor(){
    this.nucleo = new Nucleo();  
  }
  
  criarMemoria(){
    return this.nucleo.criarMemoria();
  }
  
  alocarProcesso(memoria, processo){
    this.nucleo.alocarProcesso(memoria, processo);
  }
  liberarProcesso(memoria, pid){
    this.nucleo.liberarProcesso(memoria,pid);
  }
  filasMultiplas(memoria){
    return this.nucleo.filasMultiplas(memoria);
  }
  monitor(mem,code){
    this.nucleo.monitor(mem,code);
  }
  escalonar(mem){
    this.nucleo.escalonador(mem);
  }
}
module.exports = BibliotecaDeAmbiente;