var readlineSync = require('readline-sync');
var BibliotecaDeAmbiente = require('./BibliotecaDeAmbiente');
var Processo = require('./Processo');
var bibliotecaDeAmbiente = new BibliotecaDeAmbiente();
var memoria = bibliotecaDeAmbiente.criarMemoria();

while(true){
  console.log('---------------------------------');
  console.log('1 - Cadastrar processo');
  console.log('2 - Visualizar monitor');
  console.log('3 - Escalonador');
  console.log('---------------------------------');


  var op = readlineSync.question('Entre com a op:  ');
  
  switch(op){
    case "1":
      console.clear() 
      var pid = memoria.length;
      var nome = readlineSync.question('Digite o nome do processo: ');
      var prioridade = readlineSync.question("Digite a prioridade (H ou L): ");
      var quantum = readlineSync.question("Digite o quantum do processo: ");
      var dependencia = readlineSync.question("Digite o pid do processo dependente (0 = sem dependência): ");
      var dado = 0;
      if (dependencia != 0){
        dado = readlineSync.question("Digite o dado de dependencia");  
      }
      var processo = new Processo(pid, nome, prioridade, quantum, dependencia, dado);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo);
      //console.log(memoria);
      
      break;
    case "2":
      console.clear() 
      console.log("#################################");
      console.log("1 - Todos os processos na memoria");
      console.log("2 - Filas prioritarias");
      console.log("#################################");
      var code = readlineSync.question("Digite o dado de dependencia"); 
      bibliotecaDeAmbiente.monitor(memoria,code);
      break;
    case "3":
      console.clear() 
      console.log("Iniciando o processo de escalonamento");
      bibliotecaDeAmbiente.escalonar(memoria);
      break;
    case "5":
      var pid = readlineSync.question("pid: ");
      bibliotecaDeAmbiente.liberarProcesso(memoria,pid);
      break;
    case "7":
      var processo1 = new Processo(1, "processo1", 'H', '10', '0', '0');
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo1);
      var processo2 = new Processo(2, "processo2", 'L', '10', '0', '0');
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo2);
      var processo3 = new Processo(3, "processo3", 'H', '10', '0', '0');
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo3);
      var processo4 = new Processo(4, "processo4", 'L', '10', '0', '0');
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo4);
      var processo5 = new Processo(5, "processo5", 'H', '10', '0', '0');
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo5);
      /*
      var processo6 = new Processo(6, "processo6", 'L', '10', '9', '4');
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo6);
      var processo7 = new Processo(7, "processo7", 'H', '10', '0', '0');
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo7);
      var processo8 = new Processo(8, "processo8", 'L', '10', '10', '2');
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo8);
      var processo9 = new Processo(9, "processo9", 'H', '10', '0', '0');
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo9);
      var processo10 = new Processo(10, "processo10", 'L', '10', '0', '0');
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo10);
      */
  }
}
