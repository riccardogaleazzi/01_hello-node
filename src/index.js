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
    initializeStudents,
    getStudentsSortedByAge as getStudentsSortedByAgeFromManager
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
        console.log(`${student.id} - ${student.name} - ${student.age} - ${student.faculty}`);
    }
}

async function searchStudent() {
    const name = await askQuestion("Quale studente cerchi? ");
    const result = searchStudentFromManager(name);

    if (result) {
        console.log("Studente trovato: ");
        console.log(`${student.id} - ${student.name} - ${student.age} - ${student.faculty}`);
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

    await addStudentToManager(
        name.trim(),
        numericAge,
        faculty.trim()
    );

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
        console.log(`${student.id} - ${student.name} - ${student.age} - ${student.faculty}`);
    }
}

function showStudentsSortedByAge(sortOrder) {
    const students = getStudentsSortedByAgeFromManager(sortOrder);

    for (const student of students) {
        console.log(`${student.id} - ${student.name} - ${student.age} - ${student.faculty}`);
    }
}

async function studentMenu() {
    let running = true;

    while(running) {
        console.log(chalk.blue("================================"));
        console.log(chalk.blue("       GESTIONE STUDENTI"));
        console.log(chalk.blue("================================"));
        console.log("1. Mostra studenti");
        console.log("2. Aggiungi studente");
        console.log("3. Modifica studente");
        console.log("4. Rimuovi studente");
        console.log("0. Indietro");

        const choice = (await askQuestion("Scelta: ")).trim();

        switch (choice){
            case "1": {
                showStudents();
                break;
            }

            case "2": {
                await addStudent();
                break;
            }

            case "3": {
                await updateStudent();
                break;
            }

            case "4": {
                await removeStudent();
                break;
            }

            case "0": {
                running = false;
                break;
            }

            default:
                console.log("Scelta non valida");

        }
    }
}

async function searchMenu() {
    let running = true; 

    while(running) {
        console.log(chalk.yellow("================================"));
        console.log(chalk.yellow("       RICERCA STUDENTI"));
        console.log(chalk.yellow("================================"));
        console.log("1. Cerca per nome");
        console.log("2. Cerca per facoltà");
        console.log("0. Indietro");

        const choice = (await askQuestion("Scelta: ")).trim();

        switch (choice) {
            case "1": {
                await searchStudent();
                break;
            }

            case "2": {
                await searchStudentsByFaculty();
                break;
            }

            case "0": {
                running = false; 
                break;
            }

            default:
                console.log("Scelta non valida");
        }
    }
}

async function sortMenu(){
    let running = true;

    while (running) {
        console.log(chalk.magenta("================================"));
        console.log(chalk.magenta("       ORDINAMENTO STUDENTI"));
        console.log(chalk.magenta("================================"));
        console.log("1. Età crescente");
        console.log("2. Età decrescente");
        console.log("0. Indietro");

        const choice = (await askQuestion("Scelta: ")).trim();

        switch (choice) {
            case "1": {
                showStudentsSortedByAge("asc");
                break;
            }

            case "2": {
                showStudentsSortedByAge("desc");
                break;
            }

            case "0": {
                running = false;
                break;
            }

            default: 
            console.log("Scelta non valida");
        }
    }
}

async function main() {
    await initializeStudents();
    await mainMenu();
    rl.close();
}

async function mainMenu() {
    let running = true;

    while (running) {
        console.log(chalk.green("================================"));
        console.log(chalk.green("     ENGINEERING STUDY LAB"));
        console.log(chalk.green("================================"));
        console.log("1. Gestione studenti");
        console.log("2. Ricerca studenti");
        console.log("3. Ordinamento studenti");
        console.log("0. Esci");

        const choice = (await askQuestion("Scelta: ")).trim();
        
        switch (choice) {
            case "1": {
                await studentMenu();
                break;
            }

            case "2": {
                await searchMenu();
                break;
            }

            case "3": {
                await sortMenu();
                break;
            }

            case "0": {
                console.log("Arrivederci");
                running = false;
                break;
            }

            default:
                console.log("Scelta non valida");
        }
    }
}


main();