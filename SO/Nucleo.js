class Nucleo{
  
  
  
  constructor(){
    this.READY = 'P';
    this.RUNNING = 'R';
    this.BLOCKED = 'B';
    this.FINISHED = 'F';
  }
  
  criarMemoria(){
    return [];
  }
  
  alocarProcesso(mem, processo){
        if (mem.length <= 2048){
            mem.push(processo)
            return true;
        }
        console.log("Não existe espaço na memória");
        return false;
  }
  
  liberarProcesso(mem, pid){
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
    var fila1 = [];
    var fila2 = [];
    
    //salva nas filas sem gerenciar depedendências
    for(var i=0; i < mem.length; i++){
      var p = mem[i];
      if(p.prioridade == 'H'){
        fila1.push(p);
      }
      if (p.prioridade == 'L'){
        fila2.push(p);
      }
    }
    
    //gerenciamento de dependências
    for (var i=0; i < mem.length; i++){
      var ph = mem[i];
      for(var j=0; j < mem.length; j++){
        var pl = mem[j];
        if(ph.dependencia == pl.pid){
          ph.prioridade = 'L';
          fila2.push(ph);
          fila1.splice(i,1);
        }
      }
    }
    
    //gerenciamento de dependências
    for(var i=0; i< fila2.length; i++){
      var pl = fila2[i];
      for(var j=0; j < fila1.length; j++){
        var ph = fila1[j];
        if(pl.dependencia == ph.pid){
          pl.prioridade = 'H';
          fila1.push(pl);
          fila2.splice(j,1);
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
      if(fila1.length > 0){
        console.log('Fila prioritária: ');
        for(var i = 0;i<fila1.length;i++){
          let proc = fila1[i];
          console.log(i);
          console.log("----------------------------------------");
          console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);
          
          if (proc.dependencia != 0){  // com dependência
            proc.estado = this.BLOCKED;
            console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);
            continue;
          }
          fila1.forEach((d)=>{
            if (d.dependencia == proc.pid){
              d.dependencia = 0
              d.estado = this.READY;
            }
          })
              

          proc.estado = this.RUNNING;
          
          if (proc.estado == this.RUNNING){
              console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);

              if (proc.dado != 0){
                  console.log("dado != 0");
                  var blockP  = getRandomInt(1, proc.quantum); // irá executar até block
                  console.log("blockP = "+blockP);
                  var tempP = blockP; // guarda para executar posteriormente
                  while (proc.quantum > blockP){
                      proc.percentual += 1
                      //await sleep(3000);
                      console.log("#" + proc.percentual + "%");
                      proc.quantum -= 1;
                      //console.log(proc.quantum)
                  }
                  proc.estado = this.BLOCKED
                  console.log(
                      `Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado} - Precisa do ${tempP} do processo ${proc.dado} - percentual ${proc.percentual}%`)
                  proc.quantum = tempP; // atualiza o quantum
                  proc.dado = 0;
                  continue;
              }
              if (proc.dado == 0){
                  console.log("dado == 0");
                  while (proc.quantum > 0){
                      //console.log("quantom > 0");
                      //console.log("quantom:",proc.quantum);
                      proc.percentual += 1;
                      //await sleep(3000);
                      console.log("# " + proc.percentual+"%");
                      proc.quantum -= 1;
                  }
                  proc.estado = this.FINISHED
              }
          }
         if (proc.estado == this.FINISHED){
            console.log('Processo finalizado');
            this.liberarProcesso(mem, proc.pid)
            fila1.splice(i,1);
         }    
        }
      }else if(fila2.length > 0){
        console.log('Fila não prioritária: ');
        for(var i = 0;i < fila2.length;i++){
          let proc = fila2[i];
          console.log("----------------------------------------");
          console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);
          
          if (proc.dependencia != 0){  // com dependência
            proc.estado = this.BLOCKED;
            console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);
            continue;
          }
          fila1.forEach((d)=>{
            if (d.dependencia == proc.pid){
              d.dependencia = 0
              d.estado = this.READY;
            }
          })
              

          proc.estado = this.RUNNING;
          
          if (proc.estado == this.RUNNING){
              console.log(`Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado}`);

              if (proc.dado != 0){
                  var blockP  = getRandomInt(1, proc.quantum); // irá executar até block
                  var tempP = blockP; // guarda para executar posteriormente
                  while (proc.quantum > blockP){
                      proc.percentual += 1
                      //await sleep(3000);
                      console.log("# " + proc.percentual+"%");
                      proc.quantum--;
                  }
                  proc.estado = this.BLOCKED
                  console.log(
                      `Processo [${proc.pid}] - ${proc.nome} - estado ${proc.estado} - Precisa do ${tempP} do processo ${proc.dado} - percentual ${proc.percentual}%`)
                  proc.quantum = tempP // atualiza o quantum
                  proc.dado = 0
                  continue;
              }
              if (proc.dado == 0){
                  while (proc.quantum > 0){
                      proc.percentual += 1
                      //await sleep(  3000);
                      console.log("# " + proc.percentual+"%");
                      proc.quantum--;
                  }
                  proc.estado = this.FINISHED
              }
          }
         if (proc.estado == this.FINISHED){
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

