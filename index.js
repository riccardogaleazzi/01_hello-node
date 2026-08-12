import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Primo progetto pubblicato su GitHub.");

rl.question("Come ti chiami? ", (name) => {
    rl.question("Quanti anni hai? ", (age) => {
        rl.question("Quale corso di laurea frequenti? ", (faculty) => {
            console.log(chalk.green(`Ciao ${name}!`));
            console.log(chalk.blue(`Studi ${faculty}!`));
            console.log(chalk.yellow(`Hai ${age} anni.`));

            rl.close();
        });
    });
});
