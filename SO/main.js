var readlineSync = require('readline-sync');
var BibliotecaDeAmbiente = require('./BibliotecaDeAmbiente');
var Processo = require('./Processo');
var bibliotecaDeAmbiente = new BibliotecaDeAmbiente();
var memoria = bibliotecaDeAmbiente.criarMemoria();

while(true){
  console.log('################ MENU ##################');
  console.log('#  1 - Inserir processo                #');
  console.log('#  2 - Memória                         #');
  console.log('#  3 - Escalonador                     #');
  console.log('#  4 - Carregar processos de teste     #');
  console.log('########################################');
  console.log('');

  var op = readlineSync.question('Opcao:  ');
  
  switch(op){
    case "1":
      console.clear() 
      var pid = memoria.length;
      var nome = readlineSync.question('Nome do processo: ');
      var prioridade = readlineSync.question("Prioridade (A ou B): ");
      var quantum = readlineSync.question("Quantum do processo: ");
      var dependencia = readlineSync.question("PID do processo dependente (0 = sem dependência): ");
      var dado = 0;
      if (dependencia != 0){
        dado = readlineSync.question("Dado de dependencia");  
      }
      var processo = new Processo(pid, nome, prioridade, quantum, dependencia, dado);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo);
      //console.log(memoria);
      
      break;
    case "2":
      console.clear() 
      console.log("######################################");
      console.log("# 1 - Todos os processos na memoria  #");
      console.log("# 2 - Filas prioritarias             #");
      console.log("######################################");
      console.log('');
      var code = readlineSync.question("Opcao: "); 
      bibliotecaDeAmbiente.monitor(memoria,code);
      break;
    case "3":
      console.clear() 
      console.log("Iniciando escalonamento");
      bibliotecaDeAmbiente.escalonar(memoria);
      break;
    case "4":
      var processo1 = new Processo(1, "Processo 1", 'A', '10', '0', '0');
      var processo2 = new Processo(2, "Processo 2", 'B', '12', '3', '0');
      var processo3 = new Processo(3, "Processo 3", 'B', '15', '5', '8');
      var processo4 = new Processo(4, "Processo 4", 'A', '10', '6', '0');
      var processo5 = new Processo(5, "Processo 5", 'B', '12', '0', '0');
      
      var processo6 = new Processo(6, "Processo 6", 'A', '15', '7', '0');
      var processo7 = new Processo(7, "Processo 7", 'A', '10', '1', '9');
      var processo8 = new Processo(8, "Processo 8", 'A', '12', '3', '0');
      var processo9 = new Processo(9, "Processo 9", 'B', '15', '4', '0');
      var processo10 = new Processo(10, "Processo 10", 'A', '15', '7', '0');
      
      var processo11 = new Processo(11, "Processo 11", 'A', '10', '0', '0');
      var processo12 = new Processo(12, "Processo 12", 'B', '12', '13', '0');
      var processo13 = new Processo(13, "Processo 13", 'B', '15', '15', '18');
      var processo14 = new Processo(14, "Processo 14", 'A', '10', '16', '0');
      var processo15 = new Processo(15, "Processo 15", 'B', '12', '0', '0');
      
      var processo16 = new Processo(16, "Processo 16", 'A', '15', '17', '0');
      var processo17 = new Processo(17, "Processo 17", 'A', '10', '11', '19');
      var processo18 = new Processo(18, "Processo 18", 'A', '12', '13', '0');
      var processo19 = new Processo(19, "Processo 19", 'B', '15', '14', '0');
      var processo20 = new Processo(20, "Processo 20", 'A', '15', '17', '0');
      
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo1); 
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo2);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo3);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo4);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo5);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo6);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo7);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo8);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo9);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo10);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo11); 
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo12);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo13);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo14);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo15);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo16);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo17);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo18);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo19);
      bibliotecaDeAmbiente.alocarProcesso(memoria, processo20); 
      console.log('Processos carregados.');
      console.log('');
  }
}
