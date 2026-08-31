import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..", "students.json");

export async function loadStudents() {
    try {
        const data = await readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log("Errore nel caricamento degli studenti.", error.message);
        return [];
    }
}

export async function saveStudents(students) {
    try {
        const data = JSON.stringify(students, null, 2);
        await writeFile(filePath, data, "utf-8");
    } catch (error) {
        console.log("Errore nel salvataggio degli studenti.", error.message);
    }
}