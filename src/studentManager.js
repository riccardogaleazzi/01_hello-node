import { findStudent, createStudent, findStudentById } from "./student.js";
import { loadStudents, saveStudents } from "./studentRepository.js"

let students = [
];

function generateStudentId() {
    if (students.length === 0) {
        return 1;
    }

    const maxId = Math.max(...students.map(student => student.id));

    return maxId + 1;
}

export function getStudentsSortedByAge(order) {
    if (order === "asc") {
        return [...students].sort((a, b) => a.age - b.age);
    }

    if (order === "desc") {
        return [...students].sort((a, b) => b.age - a.age);
    }

    return [];
}

export async function initializeStudents() {
    students = await loadStudents();
}

export function getAllStudents() {
    return students;
}

export async function addStudent(name, age, faculty) {
    const id = generateStudentId();
    console.log(id, name, age, faculty);
    const student = createStudent(id, name, age, faculty);

    students.push(student);
    await saveStudents(students);
}

export function searchStudent(name) {
    return findStudent(students, name);
}

export async function removeStudent(id) {
    const initialLength = students.length;

    students = students.filter(student => student.id !== id);

    const removed = students.length < initialLength;

    if(removed) {
        await saveStudents(students);
    } 

    return removed;
}

export async function updateStudent(id, newFaculty, newAge) {
    const student = findStudentById(students, id);

    if(!student) {
        return false;
    }

    student.faculty = newFaculty;
    student.age = newAge;

    await saveStudents(students);
    return true;
}

export function findStudentsByFaculty(faculty) {
    const results = students.filter(student => student.faculty.trim().toLowerCase() === faculty.trim().toLowerCase());
    return results; 
}
