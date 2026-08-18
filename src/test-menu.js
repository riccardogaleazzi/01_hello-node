import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("================================");
console.log("     ENGINEERING STUDY LAB");
console.log("================================");
console.log("1. Mostra studenti");
console.log("2. Cerca studente");
console.log("3. Esci");

rl.question("Scelta: ", (choice) => {
    console.log(`Hai scritto: [${choice}]`);
    rl.close();
});