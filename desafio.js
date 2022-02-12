let olympicsMedalTable = [
    { id: 1, country: "BRASIL", gold: 7, silver: 6, bronze: 6, continent: "AMERICA DO SUL" },
    { id: 2, country: "USA", gold: 46, silver: 37, bronze: 17, continent: "AMERICA DO NORTE" },
    { id: 3, country: "CHINA", gold: 26, silver: 18, bronze: 26, continent: "ASIA" },
    { id: 4, country: "RUSSIA", gold: 19, silver: 18, bronze: 19, continent: "EUROPA" },
    { id: 5, country: "REINO UNIDO", gold: 27, silver: 23, bronze: 17, continent: "EUROPA" },
    { id: 6, country: "ALEMANHA", gold: 17, silver: 10, bronze: 15, continent: "EUROPA" },
    { id: 7, country: "JAPÃO", gold: 12, silver: 8, bronze: 21, continent: "ASIA" },
    { id: 8, country: "ARGENTINA", gold: 3, silver: 1, bronze: 0, continent: "AMERICA DO SUL" },
    { id: 9, country: "ITALIA", gold: 8, silver: 12, bronze: 8, continent: "EUROPA" },
    { id: 10, country: "QUÊNIA", gold: 6, silver: 6, bronze: 1, continent: "AFRICA" },
];

Array.prototype.customFind = function (func) {
    // Implemente aqui seu algoritmo
    for (var elem of this) {
        if (func(elem)) {
          return elem;
        };
      };
      return undefined;
    };
    
Array.prototype.customSome = function (func) {
    // Implemente aqui seu algoritmo
    for (var elem of this) {
        if (func(elem)) {
          return true;
        };
      };
      return false;
    };
    

Array.prototype.customFilter = function (func) {
    // Implemente aqui seu algoritm
    var list = []
    for (var elem of this) {
        if (func(elem) == true) {
            list.push(elem);
        };
    };
    return list;
};


Array.prototype.customMap = function (callback) {
    // Implemente aqui seu algoritmo
    var list = []
    for (var elem of this) {
        list.push(callback(elem))
    }
    return list;
};

Array.prototype.customReduce = function (callback, initialValue=0) {
    // Implemente aqui seu algoritmo
    var acc = initialValue; // acumulador recebe o valor inicial. se não for declarado, zero.
    for(var elem of this) {
        acc = callback(acc, elem) // Esse reduce funciona apenas para somatório, falta generalizar para outras operações
    }
    return acc;
};

// Código modelo utilizando filter, map e reduce

const resultFilterMapReduce = olympicsMedalTable.filter(i => i.continent === "ASIA") // JAPÃO e CHINA 
    .map(i => i.gold) // 26 e 12
    .reduce((total, quantity) => total + quantity); // 38

console.log(`Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`);


// Implemente as funções customizadas - customFilter, customMap e customReduce e verique se o retorno é igual ao do código modelo

const resultByCustomFilterMapReduce = olympicsMedalTable.customFilter(i => i.continent === "ASIA")
    .customMap(i => i.gold)
    .customReduce((total, quantity) => total + quantity); // funcionando

console.log(`Resultado custom - Medalhas de Ouro no continente Asiático: ${resultByCustomFilterMapReduce}`);

/* DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM' CONCLUA OS DESAFIOS ABAIXO: */

console.log('__________________________________________________');

//1 - Crie um algoritmo que encontre o único pais do continente Africano

const paisAfricanoExiste = olympicsMedalTable.customSome(i => i.continent === "AFRICA"); // para esse caso, esse passo é desnecessário, serve apenas para fim de verificação

if (paisAfricanoExiste){
    var paisAfricano = olympicsMedalTable.customFind(i => i.continent === "AFRICA");
};

console.log(`O único país africano encontrado foi ${paisAfricano.country}.`);


console.log('__________________________________________________');

// 2 - Crie um algoritmo que retorne o total de medalhas por país

const medalhasPorPais =  function(paises, medalhas){
    var list = [];
    var cont = 0; // contador para o indice do array das medalhas
    for(var pais of paises){ 
        list.push(pais);
        list.push(medalhas[cont]); // preenche um array cujos índices pares receberão o nome do país e ímpares, o número de medalhas
        cont++;
    }
    return list;
};

paises = olympicsMedalTable.customMap(i => i.country);
medalhas = olympicsMedalTable.customMap(i => (i.gold + i.silver + i.bronze)); // criam arrays que recebem o nome dos países e o total de medalhas

const x = medalhasPorPais(paises, medalhas); //cria o array baseado nos arrays 'paises' e 'medalhas' criados usando map
for (var i = 0; i < x.length; i++){ 
    if(i % 2 == 0){
        console.log(`O país ${x[i]} possui ${x[i+1]} medalhas no total.`); //loop para printar a lista formatada
    };
    
};


console.log('__________________________________________________');

// 3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro

const paisesCom10MedalhasOuroNoMinimo =  olympicsMedalTable.customFilter(i => i.gold >= 10);

console.log(`Os países que conquistaram pelo menos 10 medalhas de ouro são: ${paisesCom10MedalhasOuroNoMinimo.customMap(i => i.country)}.`);


console.log('__________________________________________________');

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)

const paisesCom30MedalhasNoMinimo =  olympicsMedalTable.customFilter(i => (i.gold + i.silver + i.bronze) >= 30);

console.log(`Os países com pelo menos 30 medalhas no total são: ${paisesCom30MedalhasNoMinimo.customMap(i => i.country)}.`);


console.log('__________________________________________________');

// 5 - Crie um algoritmo para verificar se o continente América do Sul conquistou pelo menos 20 medalhas de ouro

const paisesComPeloMenos20MedalhasDeOUro = olympicsMedalTable.customFilter(i => i.continent === "AMERICA DO SUL")
    .customMap(i => i.gold)
    .customReduce((t, atual) => t + atual);

    console.log(`A América do Sul conquistou ${paisesComPeloMenos20MedalhasDeOUro} medalhas de ouro.`);

if(paisesComPeloMenos20MedalhasDeOUro < 20){
    console.log('Portanto, conquistou menos de 20 medalhas de ouro.');
} else{
    console.log('Portanto, conquistou mais de 20 medalhas de ouro.'); // teste apenas para caso houvesse mais de 20 medalhas
};