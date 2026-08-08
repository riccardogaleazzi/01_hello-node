const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Come ti chiami? ", (name) => {
    rl.question("Quanti anni hai? ", (age) => {
        rl.question("Quale corso di laurea frequenti? ", (faculty) => {
            console.log(`Ciao ${name}!`);
            console.log(`Studi ${faculty}! Benvenuto nel laboratorio software`);
            console.log(`Tu hai ${age}`);
            rl.close();
        });
    
    });
    
});