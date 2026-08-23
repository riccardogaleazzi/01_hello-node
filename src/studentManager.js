import { createStudent, findStudent } from "./student.js";

let students = [
    createStudent("Riccardo", 19, "Ingegneria Aerospaziale"),
    createStudent("Daniele", 20, "Ingegneria Meccanica"),
    createStudent("Marco", 21, "Ingegneria Informatica")
];

export function getAllStudents() {
    return students;
}

export function addStudent(student) {
    students.push(student);
}

export function searchStudent(name) {
    return findStudent(students, name);
}

export function removeStudent(name) {
    const initialLength = students.length;

    students = students.filter(student => student.name !== name);

    return students.length < initialLength;
}

export function updateStudent(name, newFaculty, newAge) {
    const student = findStudent(students, name);

    if (!student) {
        return false;
    }

    student.faculty = newFaculty;
    student.age = newAge;

    return true;
}

export function findStudentsByFaculty(faculty) {
    const results = students.filter(student => student.faculty.trim().toLowerCase() === faculty.trim().toLowerCase());
    return results; 
}
