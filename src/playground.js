const students = [
    {
        name: "Riccardo",
        age: 19,
        faculty: "Ingegneria Aerospaziale"
    },
    {
        name: "Daniele",
        age: 20,
        faculty: "Ingegneria Meccanica"
    },
    {
        name: "Marco",
        age: 21,
        faculty: "Ingegneria Informatica"
    }
];

function findStudent(students, name) {
    for (const student of students){
        if(student.name === name) {
            return student;
        }
    }

    return null;
}

const result = findStudent(students, "Luca");

if(result !== null) {
    console.log(`Studente trovato: ${result.name}`);
    console.log(`Età: ${result.age}`);
    console.log(`Corso: ${result.faculty}`);
} else {
    console.log("Studente non trovato");
}
    