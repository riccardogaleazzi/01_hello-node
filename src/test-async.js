import readline from "readline";

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

async function test() {
    console.log("================================");
    console.log("     ENGINEERING STUDY LAB");
    console.log("================================");
    console.log("1. Mostra studenti");
    console.log("2. Cerca studente");
    console.log("3. Esci");

    const choice = await askQuestion("Scelta: ");

    console.log(`Hai scritto: [${choice}]`);

    rl.close();
}

test();