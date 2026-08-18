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
    const choice = await askQuestion("Scrivi un numero: ");

    console.log(`Hai scritto: [${choice}]`);

    rl.close();
}

test();