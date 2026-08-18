import readline from "readline";
import chalk from "chalk";
import { createStudent, findStudent } from "./student.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

const students = [];

students.push(createStudent("Riccardo", 19, "Ingegneria Aerospaziale"));
students.push(createStudent("Daniele", 20, "Ingegneria Meccanica"));
students.push(createStudent("Marco", 21, "Ingegneria Informatica"));

async function showMenu() {
    console.log("================================");
    console.log("     ENGINEERING STUDY LAB");
    console.log("================================");
    console.log("1. Mostra studenti");
    console.log("2. Cerca studente");
    console.log("3. Esci");

    const choice = await askQuestion("Scelta: ");
    console.log(`DEBUG → [${choice}]`);
    if (choice === "1") {
        for (const student of students) {
            console.log(`${student.name} - ${student.age} - ${student.faculty}`);
        }

        await showMenu();

    } else if (choice === "2") {
        const name = await askQuestion("Quale studente cerchi? ");
        const result = findStudent(students, name);

        if (result !== null) {
            console.log(`Studente trovato: ${result.name}`);
            console.log(`Età: ${result.age}`);
            console.log(`Corso: ${result.faculty}`);
        } else {
            console.log("Studente non trovato");
        }

        await showMenu();

    } else if (choice === "3") {
        console.log("Arrivederci!");
        rl.close();

    } else {
        console.log("Scelta non valida.");
        await showMenu();
    }
}

showMenu();