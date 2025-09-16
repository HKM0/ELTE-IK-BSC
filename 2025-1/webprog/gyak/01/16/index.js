const mindenElemParos = matrix => matrix.every(sor => sor.every(x => x % 2 === 0));

const matrix = [
    [2, 2, 4],
    [4, 10, 12]
];
console.log(mindenElemParos(matrix));