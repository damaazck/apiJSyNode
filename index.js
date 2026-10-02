import express from 'express';
import fs from "fs";

const app = express();

app.use(express.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "." });
});

app.get("/alumnos", (req, res) => {
    const data = readData();
    res.json(data.alumnos);
});

app.get("/alumnos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);

    const alumno = data.alumnos.find(
        (alumno) => alumno.id === id
    );

    res.json(alumno);
});

app.listen(3000, () => {
    console.log('Servidor escuchando por el puerto 3000');
});
