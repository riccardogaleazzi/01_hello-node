export function createStudent(id, name, age, faculty) {
    return {
        id: id,
        name: name,
        age: age,
        faculty: faculty,
        university: "Politecnico di Milano"
    };
}

export function findStudent(students, name) {
    for (const student of students) {
        if (student.name === name) {
            return student;
        }
    }

    return null;
}