import { findStudent } from "./student.js";
import { readFile, writeFile } from "fs/promises";

let students = [
];

export async function loadStudents() {
    try {
        const data = await readFile("./students.json", "utf-8");
        students = JSON.parse(data);
    } catch (error) {
        console.log("Errore nel caricamento degli studenti.");
    }
}

async function saveStudents() {
    try {
        const data = JSON.stringify(students, null, 2);
        await writeFile("./students.json", data, "utf-8");
    } catch (error) {
        console.log("Errore nel salvataggio degli studenti.");
    }
}

export function getAllStudents() {
    return students;
}

export async function addStudent(student) {
    students.push(student);
    await saveStudents();
}

export function searchStudent(name) {
    return findStudent(students, name);
}

export async function removeStudent(name) {
    const initialLength = students.length;

    students = students.filter(student => student.name !== name);

    const removed = students.length < initialLength;

    if(removed) {
        await saveStudents();
    } 

    return removed;
}

export async function updateStudent(name, newFaculty, newAge) {
    const student = findStudent(students, name);

    if (!student) {
        return false;
    }

    student.faculty = newFaculty;
    student.age = newAge;
    await saveStudents();
    return true;
}

export function findStudentsByFaculty(faculty) {
    const results = students.filter(student => student.faculty.trim().toLowerCase() === faculty.trim().toLowerCase());
    return results; 
}
