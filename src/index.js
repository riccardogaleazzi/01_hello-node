import readline from "readline";
import chalk from "chalk";
import { createStudent, findStudent } from "./student.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

const students = [
    createStudent("Riccardo", 19, "Ingegneria Aerospaziale"),
    createStudent("Daniele", 20, "Ingegneria Meccanica"),
    createStudent("Marco", 21, "Ingegneria Informatica")
];

async function main() {
    let running = true;

    while (running) {
        console.log(chalk.green("================================"));
        console.log(chalk.green("     ENGINEERING STUDY LAB"));
        console.log(chalk.green("================================"));
        console.log("1. Mostra studenti");
        console.log("2. Cerca studente");
        console.log("3. Esci");

        const choice = await askQuestion("Scelta: ");

        switch (choice) {
            case "1":
                for (const student of students) {
                    console.log(
                        `${student.name} - ${student.age} - ${student.faculty}`
                    );
                }
                break;

            case "2": {
                const name = await askQuestion("Quale studente cerchi? ");
                const result = findStudent(students, name);

                if (result) {
                    console.log(`Studente trovato: ${result.name}`);
                    console.log(`Età: ${result.age}`);
                    console.log(`Corso: ${result.faculty}`);
                } else {
                    console.log("Studente non trovato");
                }

                break;
            }

            case "3":
                console.log("Arrivederci!");
                running = false;
                break;

            default:
                console.log("Scelta non valida.");
        }
    }

    rl.close();
}

main();