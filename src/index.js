import readline from "readline";
import chalk from "chalk";
import { createStudent } from "./student.js";
import {
    getAllStudents,
    addStudent as addStudentToManager,
    searchStudent as searchStudentFromManager,
    removeStudent as removeStudentFromManager,
    updateStudent as updateStudentFromManager,
    findStudentsByFaculty as findStudentsByFacultyFromManager,
    loadStudents
} from "./studentManager.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

function showStudents() {
    const students = getAllStudents();

    for (const student of students) {
        console.log(`${student.name} - ${student.age} - ${student.faculty}`);
    }
}

async function searchStudent() {
    const name = await askQuestion("Quale studente cerchi? ");
    const result = searchStudentFromManager(name);

    if (result) {
        console.log(`Studente trovato: ${result.name}`);
        console.log(`Età: ${result.age}`);
        console.log(`Corso: ${result.faculty}`);
    } else {
        console.log("Studente non trovato");
    }
}

async function addStudent() {
    const name = await askQuestion("Come ti chiami? ");

    if (name.trim() === "") {
        console.log("il nome non può essere vuoto. ");
        return;
    }

    const age = await askQuestion("Quanti anni hai? ");
    const numericAge = Number(age);

    if (
        Number.isNaN(numericAge) ||
        numericAge <= 0 ||
        numericAge > 130 ||
        !Number.isInteger(numericAge)
    ) {
        console.log("Età non valida.");
        return;
    }

    const faculty = await askQuestion("Quale corso frequenti? ");

    if (faculty.trim() === "") {
        console.log("Il corso non può essere vuoto.");
        return;
    }

    const newStudent = createStudent(name.trim(), numericAge, faculty.trim());

    await addStudentToManager(newStudent);

    console.log("Studente aggiunto!");
}

async function removeStudent() {
    const name = await askQuestion("Quale studente vuoi rimuovere? ");

    const removed = await removeStudentFromManager(name);

    if (removed) {
        console.log("Studente rimosso!");
    } else {
        console.log("Studente non trovato.");
    }
}

async function updateStudent(){
    const name = await askQuestion("Quale studente vuoi modificare? ");
    const newFaculty = await askQuestion("Nuovo corso di laurea: ");
    const newAge = await askQuestion("Nuova età: ");
    const numericAge = Number(newAge);

    const updated = await updateStudentFromManager(name, newFaculty, numericAge);

    if(updated) {
        console.log("Studente aggiornato!");
    } else {
        console.log("Studente non trovato.");
    }
}

async function searchStudentsByFaculty() {
    const faculty = await askQuestion("Quale facoltà cerchi? ");

    const results = findStudentsByFacultyFromManager(faculty);

    if (results.length === 0) {
        console.log("Nessuno studente trovato.");
        return;
    }

    for (const student of results) {
        console.log(`${student.name} - ${student.age} - ${student.faculty}`);
    }
}

async function main() {
    await loadStudents();

    let running = true;

    while (running) {
        console.log(chalk.green("================================"));
        console.log(chalk.green("     ENGINEERING STUDY LAB"));
        console.log(chalk.green("================================"));
        console.log("1. Mostra studenti");
        console.log("2. Cerca studente");
        console.log("3. Esci");
        console.log("4. Aggiungi studente");
        console.log("5. Rimuovi studente");
        console.log("6. Modifica studente");
        console.log("7. Cerca studenti per facoltà");

        const choice = await askQuestion("Scelta: ");

        switch (choice) {
            case "1": {
                showStudents();
                break;
            }

            case "2": {
                await searchStudent();
                break;
            }

            case "3": {
                console.log("Arrivederci!");
                running = false;
                break;
            }
            case "4": {
                await addStudent();
                break;
            }
            case "5": {
                await removeStudent();
                break;
            }
            case "6": {
                await updateStudent();
                break;
            }
            case "7": {
                await searchStudentsByFaculty();
                break;
            }

            default:
                console.log("Scelta non valida.");

        }
    }

    rl.close();
}

main();