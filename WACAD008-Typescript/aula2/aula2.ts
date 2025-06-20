// arquivos de aula

// da pra add tipos possiveis para uma val
let posId: string | number

const num = (a: number, b: number): number => {
    return a + b;
}

//array padrao typescript

let array: number[] = [1, 2, 3, 4]

//da pra especificar tipos para index de tuplas
const myTuple: [string, number, boolean] = ['Mess', 18,  true]


//tipo objetos
//serve como referencia pra pegar tipos compostos

let myObj: Object
myObj = [] //<- aceita qualquer tipo de obj
console.log(myObj)

const exampleObj = {
    prop1: 'Dave',
    prop2: true
}
//nao permite mudar estrutura de um objeto, diferente do js
//exampleObj.prop3 = 19

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

interface Guitarist {
    name?: string,
    active: boolean,
    albums: (string | number) []
}

const greetGuitarist = (guitarist: Guitarist) => {
    if (guitarist.name) {
        return `Hello ${guitarist.name?.toUpperCase()}!`
    }
    return 'Hello!'
} //armazenar codigos condicionais em uma variavel dentro do codigo e retornar ao final do fluxo, memory safe

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

enum Grade {
    A = 1,
    B,
    C,
    D
}
//ideia abstrada nao deve saber como e implementada
//ordem -> regras de negocio -> implementacao
console.log(Grade.D)

//Type Aliases

//aplido pra tipo
type stringOrNumber = string | number;

type arrayStringOrNumber = (string | number);


//Literal types

let myName: 'Dave' //<-- so aceita essa sting e mais nada
//constante

let userName: "HOHO" | "SAI" | "JOJO";

//functions
const add = (a: number, b: number): number => {
    return a + b
}

let subtract = function (c: number, d: number): number {
    return c - d
}

//interface ou type pra functions

//parametros opcionais

//default pram value melhor pra evitar if dentro do codigo, so nao e indicado se um valor default possa prejudicar o registro

//custom type guard ajuda a evitar problemas de transpilacao incorreta, evita aceitar tipos indesejados ou fora de range

//prisma permite migrar banco mais facil

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//Injecao de dependencia
