class Nucleo{
  
  constructor(){
    //estados de execução
    this.PRONTO = 'P';
    this.EXECUTANDO = 'E';
    this.BLOQUEADO = 'B';
    this.FINALIZADO = 'F';
  }
  
  criarMemoria(){
    return [];
    //retorna um array vazio
  }
  
  alocarProcesso(mem, processo){
    //verifica se há espaço na memória
        if (mem.length <= 2048){
            mem.push(processo)
            return true;
        }
        console.log("Não existe espaço na memória");
        return false;
  }
  
  liberarProcesso(mem, pid){
    //busca o processo e retira da memória
        if (mem.length == 0){
            console.log("Memória vazia");
            return false;
        }
        for(var i=0; i< mem.length; i++){
          var item = mem[i];
            if (item.pid == pid){
                console.log("Item encontrado e pronto a ser removido");
                mem.splice(i,1);
                return true;
            }
        }

        console.log("O processo não se encontra na memória");
        return false
  }
  
  filasMultiplas(mem){
    //define duas filas
    var fila1 = [];
    var fila2 = [];
    
    //salva os processos com alta prioridade na fila 1 e com baixa na fila 2 
    for(var i=0; i < mem.length; i++){
      let p = mem[i];
      if(p.prioridade == 'A'){
        fila1.push(p);
      }
      if (p.prioridade == 'B'){
        fila2.push(p);
      }
    }
    
    //verifica se na fila 1 há um processo que depende de um processo da fila 2
    //se existir passa esse processo dependente para a fila 2
    for (var i=0; i < fila1.length; i++){
      var ph = fila1[i];
      for(var j=0; j < fila2.length; j++){
        var pl = fila2[j];
        if(ph.dependencia == pl.pid){
          ph.prioridade = 'B';
          fila2.push(ph);
          fila1.splice(i,1);
          
        }
      }
    }
    //verifica se na fila 2 há um processo que depende de um processo da fila 1
    //se existir passa esse processo dependente para a fila 1
    for(var i=0; i< fila2.length; i++){
      var pl = fila2[i];
      for(var j=0; j < fila1.length; j++){
        var ph = fila1[j];
        if(pl.dependencia == ph.pid){
          pl.prioridade = 'A';
          fila1.push(pl);
          fila2.splice(i,1);
        }
      }
    }
    
    return[fila1, fila2];
  }
  async escalonador(mem){
    var filas = this.filasMultiplas(mem);
    var fila1 = filas[0];
    var fila2 = filas[1];
    while(true){
      //inicia o escalonamento com a fila prioritária
      if(fila1.length > 0){
        console.log('Fila prioritária: ');
        //percorre a fila prioritaria até que todos os processos sejam executados
        for(var i = 0; i < fila1.length ; i++){
          let proc = fila1[i];
          console.log("----------------------------------------");
          console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);
          
          if (proc.dependencia != 0){  // se houver dependencia é bloqueado e passa para o próximo processo
            proc.estado = this.BLOQUEADO;
            console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);
            continue;
          }
          //verifica se o processo atual é dependencia de outro processo na mesma fila, se tiver tira a dependencia e passa para pronto
          for(let k = 0;k<fila1.length;k++){
            let d = fila1[k];
            if (d.dependencia == proc.pid){
              d.dependencia = 0
              d.estado = this.PRONTO;
            }
          }  
          proc.estado = this.EXECUTANDO;
          
          if (proc.estado == this.EXECUTANDO){
              console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);
            
              //executa até precisar do dado dependente
              if (proc.dado != 0){
                  var blockP  = getRandomInt(1, proc.quantum); // sorteia um tempo em que o processo será bloqueado
                  var tempP = blockP; 
                //executa o processo até ser bloqueado
                  while (proc.quantum > blockP){
                      proc.percentual += 1
                      //await sleep(3000);
                      console.log(".".repeat(proc.percentual));
                      proc.quantum -= 1;
                  }
                //bloqueia o processo
                  proc.estado = this.BLOQUEADO
                  console.log(
                      `Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado} - Precisa do ${tempP} do processo ${proc.dado} - percentual ${proc.percentual}%`)
                  proc.quantum = tempP; 
                  proc.dado = 0;
                  continue;
              }
            //se o processo não tiver dado dependente ele executa até ser finalizado
              if (proc.dado == 0){
                  while (proc.quantum > 0){
                      proc.percentual += 1;
                      //await sleep(3000);
                      console.log(".".repeat(proc.percentual));
                      proc.quantum -= 1;
                  }
                  proc.estado = this.FINALIZADO
              }
          }
         if (proc.estado == this.FINALIZADO){
            console.log('Processo finalizado');
            this.liberarProcesso(mem, proc.pid)
            fila1.splice(i,1);
         }    
        }
      }else if(fila2.length > 0){
        //inicia o escalonamento com a fila não prioritária
        console.log('Fila não prioritária: ');
        //percorre a fila não prioritaria até que todos os processos sejam executados
        for(var i = 0; i < fila2.length ; i++){
          //let proc = fila2[i];
          console.log("----------------------------------------");
          console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);
          
          if (proc.dependencia != 0){ // se houver dependencia é bloqueado e passa para o próximo processo
            proc.estado = this.BLOQUEADO;
            console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);
            continue;
          }
          
          //verifica se o processo atual é dependencia de outro processo na mesma fila, se tiver tira a dependencia e passa para pronto
          for(let k = 0; k< fila2.length;k++){
            let d = fila2[k];
            if (d.dependencia == proc.pid){
              d.dependencia = 0
              d.estado = this.PRONTO;
            }
          }
              

          proc.estado = this.EXECUTANDO;
          
          if (proc.estado == this.EXECUTANDO){
              console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);
            
            //executa até precisar do dado dependente
              if (proc.dado != 0){
                  var blockP  = getRandomInt(1, proc.quantum);
                  var tempP = blockP; 
                //executa o processo até ser bloqueado
                  while (proc.quantum > blockP){
                      proc.percentual += 1
                      //await sleep(3000);
                      console.log(".".repeat(proc.percentual));
                      proc.quantum--;
                  }
                //bloqueia o processo
                  proc.estado = this.BLOQUEADO
                  console.log(
                      `Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado} - Precisa do ${tempP} do processo ${proc.dado} - percentual ${proc.percentual}%`)
                  proc.quantum = tempP // atualiza o quantum
                  proc.dado = 0
                  continue;
              }
            //se o processo não tiver dado dependente ele executa até ser finalizado
              if (proc.dado == 0){
                  while (proc.quantum > 0){
                      proc.percentual += 1
                      //await sleep(3000);
                      //100 = quantum
                      //x = percentual
                      //percentual*100 = x*quantum
                      //x = percentual*quantum/100
                      console.log(".".repeat(proc.percentual));
                      proc.quantum--;
                  }
                  proc.estado = this.FINALIZADO
              }
          }
         if (proc.estado == this.FINALIZADO){
            console.log('Processo finalizado');
            this.liberarProcesso(mem, proc.pid)
            fila2.splice(i,1);
         }    
        }
      }else{
        break;
      }
    } 
  }
  //Exibe memória
  monitor(mem, code){
        if (mem.length == 0){
            console.log("Memória está vazia");
            return false;
        }
        if(code == 1){
            console.log('Todos os processos na memória:');
            mem.forEach((process)=>{
              console.log("--------------");
              console.log("PID:", process.pid);
              console.log("Nome:", process.nome);
              console.log("Prioridade:", process.prioridade);
              console.log("Quantum:", process.quantum);
              console.log('Estado:', process.estado);
              console.log("Dependência:", process.dependencia);
              console.log("Dado:", process.dado);
              console.log("Percentual", process.percentual);
              console.log('-----------------');
            })
                
        }
        else if(code == 2){
          var filas = this.filasMultiplas(mem);
          console.log('----------------------------------------');
          console.log('Apenas o PID dos processos')
          console.log("Fila prioritária:", filas[0].map((proc)=>{return proc.pid}));
          console.log("Fila não prioritária: ", filas[1].map((proc)=>{return proc.pid}));
          console.log('----------------------------------------');
        }
            
        else{
          console.log('Código inválido');
          return False
        }
            
  }
}
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
module.exports = Nucleo;

