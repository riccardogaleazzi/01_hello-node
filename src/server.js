import http from "http";
import { 
    addStudent,
    getAllStudents,
    searchStudentById,
    initializeStudents,
    removeStudent
 } from "./studentManager.js";

const server = http.createServer(async (req, res) => {

    if (req.method === "DELETE" && req.url.startsWith("/students/")) {
    const id = Number(req.url.split("/")[2]);
    const removed = await removeStudent(id);

    if (!removed) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Eliminazione dello studente non riuscita");
        return;
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Studente eliminato con successo!");
    return;
}

    if (req.method === "POST" && req.url === "/students") {
    let body = "";

    req.on("data", chunk => {
        body += chunk;
    });

req.on("end", async () => {
    try {
        const data = JSON.parse(body);

        const student = await addStudent(
            data.name,
            data.age,
            data.faculty
        );

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(student, null, 2));

    } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("JSON non valido");
    }
});

    return;
}

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Engineering Study Lab API online!");
        return;
    }

    if (req.method === "GET" && req.url.startsWith("/students/")) {
        const id = Number(req.url.split("/")[2]);
        const student = searchStudentById(id);

        if(!student) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Studente non trovato");
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(student, null, 2));
        return;
    }

    if (req.method === "GET" && req.url === "/students") {
        const students = getAllStudents();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students, null, 2));
        return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Endpoint non trovato");
});

async function startServer() {
    await initializeStudents();

    server.listen(3000, () => {
        console.log("Server avviato su http://localhost:3000");
    });
}

startServer();